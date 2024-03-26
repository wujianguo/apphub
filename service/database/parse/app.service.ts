import { z } from "zod";
import { AppCreateDto, AppCreateSchema, AppUpdateDto, ReleaseCreateSchema, WebhookCreateDto } from '../../dto';
import { AppManagerInterface, Pagination } from '../../interface';
import { AppModel } from '../../model';
import { JSONValue } from '../core';
import { ObjectCreateResponseSchema, ObjectUpdateResponseSchema, RequestService } from './request.service';
import { NotFoundError } from "../core/response";


export const AppParseSchema = AppCreateSchema.extend({
  objectId: z.string(),
  index: z.number(),
  count: z.number(),
  icon: z.object({
    url: z.string().url(),
  }).transform((value) => value.url).optional(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const ReleaseParseSchema = ReleaseCreateSchema.extend({
  objectId: z.string(),
  index: z.number(),
  extra: z.any().optional(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export class AppManagerService implements AppManagerInterface {

  constructor(private readonly request: RequestService) { }

  toModel(json: JSONValue | undefined): AppModel {
    const data = AppParseSchema.parse(json);
    const model = new AppModel();
    model.fullfill(data);
    model.index = data.index;
    model.count = data.count;
    model.id = data.objectId;
    return model;
  }

  async createApp(dto: AppCreateDto): Promise<AppModel> {
    const resp = await this.request.post(`/classes/${AppModel.tableName}`, dto);
    const data = ObjectCreateResponseSchema.parse(resp.json);
    const model = new AppModel();
    model.fullfill(dto);
    model.id = data.objectId;
    model.createdAt = new Date(data.createdAt);
    model.updatedAt = new Date(data.createdAt);
    return model;
  }

  async getAppList(page = 1, perPage = 10): Promise<Pagination<AppModel>> {
    const resp = await this.request.get(`/classes/${AppModel.tableName}`);
    const array = this.request.array(resp.json);
    return { total: array.length, data: array.map((json) => this.toModel(json)) };
  }

  async getApp(id: string): Promise<AppModel> {
    const resp = await this.request.get(`/classes/${AppModel.tableName}/${id}`);
    return this.toModel(resp.json);
  }

  async getAppBySlug(slug: string): Promise<AppModel> {
    const query = {
      where: JSON.stringify({ slug: slug }),
      limit: '1',
    };
    const resp = await this.request.get(`/classes/${AppModel.tableName}`, query);
    const array = this.request.array(resp.json);
    if (array.length === 0) {
      throw new NotFoundError();
    }
    return this.toModel(array[0]);
  }

  async updateApp(id: string, dto: AppUpdateDto): Promise<Date> {
    const resp = await this.request.put(`/classes/${AppModel.tableName}/${id}`, dto);
    return new Date(ObjectUpdateResponseSchema.parse(resp.json).updatedAt);
  }

  async updateAppBySlug(slug: string, dto: AppUpdateDto): Promise<Date> {
    const data = await this.getAppBySlug(slug);
    return await this.updateApp(data.id, dto);
  }

  async updateIcon(id: string, data: FormData): Promise<string> {
    const file: File | null = data.get('file') as unknown as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const resp = await this.request.upload(`/files/${file.name}`, buffer, file.type);
    const payload = {
      icon: {
        __type: 'File',
        name: resp.name,
        url: resp.url,
      },
    }
    await this.request.put(`/classes/${AppModel.tableName}/${id}`, payload);
    return resp.url;
  }

  async updateIconBySlug(slug: string, data: FormData): Promise<string> {
    const app = await this.getAppBySlug(slug);
    return await this.updateIcon(app.id, data);
  }

  async deleteApp(id: string): Promise<boolean> {
    await this.request.delete(`/classes/${AppModel.tableName}/${id}`);
    return true;
  }

  async deleteAppBySlug(slug: string): Promise<boolean> {
    const app = await this.getAppBySlug(slug);
    return await this.deleteApp(app.id);
  }

  async setWebhook(slug: string, webhook: WebhookCreateDto): Promise<void> {
    const app = await this.getAppBySlug(slug);
    const query = {
      where: JSON.stringify({ app: { '__type': 'Pointer', 'className': AppModel.tableName, 'objectId': app.id } }),
      limit: '1',
    };
    const resp = await this.request.get(`/classes/Webhook`, query);
    const array = this.request.array(resp.json);
    if (array.length === 0) {
      const payload: JSONValue = webhook;
      payload.app = {
        '__type': 'Pointer',
        'className': AppModel.tableName,
        'objectId': app.id,
      };
      await this.request.post(`/classes/Webhook`, payload);  
    } else {
      const data = ObjectCreateResponseSchema.parse(array[0]);
      await this.request.put(`/classes/Webhook/${data.objectId}`, webhook);
    }
  }
}
