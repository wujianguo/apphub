import { ReleaseInterface, Pagination } from '../../interface';
import { ReleaseCreateDto, WebhookCreateSchema } from '../../dto';
import { PlatformType } from '../../core/enum';
import { JSONValue, NotFoundError } from "../core/response";
import { AppModel, ReleaseModel } from '../../model';
import { ObjectCreateResponseSchema, RequestService } from './request.service';
import { ReleaseParseSchema } from './app.service';

export class ReleaseService implements ReleaseInterface {

  constructor(
    private readonly request: RequestService,
    private readonly app: AppModel) { }

  toModel(json: JSONValue | undefined): ReleaseModel {
    const data = ReleaseParseSchema.parse(json);
    const model = new ReleaseModel();
    model.fullfill(data);
    model.id = data.objectId;
    return model;
  }

  async updateAppIndexAndCount(): Promise<void> {
    const payload = {
      'index': {
        "__op": "Increment",
        "amount": 1
      },
      'count': {
        "__op": "Increment",
        "amount": 1
      }
    };
    await this.request.put(`/classes/${AppModel.tableName}/${this.app.id}`, payload);
  }

  formatSize(size: number): string {
    if (size < 1024) {
      return `${size} B`;
    }
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    }
    if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    }
    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }

  fullfil(template: string, release: ReleaseModel): string {
    return template
      .replaceAll('${name}', release.name)
      .replaceAll('${index}', release.index.toString())
      .replaceAll('${fingerprint}', release.fingerprint)
      .replaceAll('${version}', release.version)
      .replaceAll('${shortVersion}', release.shortVersion)
      .replaceAll('${bundleIdentifier}', release.bundleIdentifier)
      .replaceAll('${description}', release.description)
      .replaceAll('${commitId}', release.commitId)
      .replaceAll('${platformType}', release.platformType)
      .replaceAll('${buildType}', release.buildType)
      .replaceAll('${file.name}', release.file.name)
      .replaceAll('${file.size}', release.file.size.toString())
      .replaceAll('${file.size.format}', this.formatSize(release.file.size))
      .replaceAll('${file.url}', release.file.url)
      .replaceAll('${icon.url}', release.icon?.url || '')
      .replaceAll('${app.slug}', this.app.slug)
      .replaceAll('${createdAt}', release.createdAt.toISOString())
      ;
  }

  async notify(release: ReleaseModel): Promise<void> {
    const query = {
      where: JSON.stringify({ app: { '__type': 'Pointer', 'className': AppModel.tableName, 'objectId': this.app.id } }),
      limit: '1',
    };
    const resp = await this.request.get(`/classes/Webhook`, query);
    const array = this.request.array(resp.json);
    if (array.length === 0) {
      return;
    }
    const webhook = WebhookCreateSchema.parse(array[0]);
    if (webhook.url) {
      const headers = {
        'Content-Type': 'application/json',
      };
      await fetch(webhook.url, {method: 'POST', headers: headers, body: this.fullfil(webhook.template, release)});
    }
  }

  async createRelease(release: ReleaseCreateDto): Promise<ReleaseModel> {
    const payload: JSONValue = release;
    payload.app = {
      '__type': 'Pointer',
      'className': AppModel.tableName,
      'objectId': this.app.id,
    };
    payload.index = this.app.index + 1
    const resp = await this.request.post(`/classes/${ReleaseModel.tableName}`, payload);
    const data = ObjectCreateResponseSchema.parse(resp.json);
    const model = new ReleaseModel();
    model.fullfill(release);
    model.id = data.objectId;
    model.createdAt = new Date(data.createdAt);
    model.updatedAt = new Date(data.createdAt);
    await this.updateAppIndexAndCount();
    await this.notify(model);
    return model;
  }

  async getReleaseList(page = 1, perPage = 10, platformType?: PlatformType): Promise<Pagination<ReleaseModel>> {
    const query = {
      order: '-createdAt',
      where: JSON.stringify({
        platformType: platformType,
        app: {
          '__type': 'Pointer',
          'className': AppModel.tableName,
          'objectId': this.app.id,
        }
      }),
      limit: `${perPage}`,
      skip: `${(page - 1) * perPage}`,
    };
    const resp = await this.request.get(`/classes/${ReleaseModel.tableName}`, query);
    const array = this.request.array(resp.json);
    return { total: array.length, data: array.map((json) => this.toModel(json)) };
  }

  async getRelease(index: number): Promise<ReleaseModel> {
    const query = {
      order: '-createdAt',
      where: JSON.stringify({
        index: index,
        app: {
          '__type': 'Pointer',
          'className': AppModel.tableName,
          'objectId': this.app.id,
        }
      }),
      limit: '1',
    };
    console.log(query);
    const resp = await this.request.get(`/classes/${ReleaseModel.tableName}`, query);
    const array = this.request.array(resp.json);
    if (array.length === 0) {
      console.log('not found index: ', index);
      throw new NotFoundError();
    }
    return this.toModel(array[0]);
  }

  async getLatest(tryPlatform?: PlatformType): Promise<ReleaseModel> {
    const where: JSONValue = {
      app: {
        '__type': 'Pointer',
        'className': AppModel.tableName,
        'objectId': this.app.id,
      }
    }
    if (tryPlatform) {
      where.platformType = tryPlatform;
      const query = {
        order: '-createdAt',
        where: JSON.stringify(where),
        limit: '1',
      };
      const resp = await this.request.get(`/classes/${ReleaseModel.tableName}`, query);
      const array = this.request.array(resp.json);
      if (array.length > 0) {
        return this.toModel(array[0]);
      }
    }

    const query = {
      order: '-createdAt',
      where: JSON.stringify(where),
      limit: '1',
    };
    const resp = await this.request.get(`/classes/${ReleaseModel.tableName}`, query);
    const array = this.request.array(resp.json);
    if (array.length === 0) {
      throw new NotFoundError();
    }
    return this.toModel(array[0]);
  }
}
