import { z } from "zod";
import { AppCreateDto, AppCreateSchema, AppUpdateDto, WebhookCreateDto } from "../../dto";
import { AppManagerInterface, Pagination } from "../../interface";
import { AppModel } from "../../model";
import { JSONValue } from "../core";
import { ObjectCreateResponseSchema, ObjectUpdateResponseSchema, RequestService } from "./request.service";

export const AppSupabaseSchema = AppCreateSchema.extend({
  id: z.number(),
  icon: z.string().optional().default(""),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export class AppManagerService implements AppManagerInterface {

  constructor(private readonly request: RequestService) { }

  toModel(json: JSONValue | undefined): AppModel {
    const data = AppSupabaseSchema.parse(json);
    const model = new AppModel();
    model.fullfill(data);
    model.id = data.id.toString();
    return model;
  }

  async createApp(app: AppCreateDto): Promise<AppModel> {
    const resp = await this.request.post(`/rest/v1/${AppModel.tableName}`, app);
    const data = ObjectCreateResponseSchema.parse(resp.json);
    const model = new AppModel();
    model.fullfill(app);
    model.id = data.id.toString();
    model.createdAt = new Date(data.createdAt);
    model.updatedAt = new Date(data.createdAt);
    return model;
  }

  async getAppList(page = 1, perPage = 10): Promise<Pagination<AppModel>> {
    const resp = await this.request.get(`/rest/v1/${AppModel.tableName}`);
    const array = this.request.array(resp.json);
    return { total: array.length, data: array.map((json) => this.toModel(json)) };
  }

  async getApp(id: string): Promise<AppModel> {
    const resp = await this.request.getObject(`/rest/v1/${AppModel.tableName}`, { id: `eq.${id}` });
    return this.toModel(resp.json);
  }

  async getAppBySlug(slug: string): Promise<AppModel> {
    const resp = await this.request.getObject(`/rest/v1/${AppModel.tableName}`, { slug: `eq.${slug}` });
    return this.toModel(resp.json);
  }

  async updateApp(id: string, app: AppUpdateDto): Promise<Date> {
    const resp = await this.request.patch(`/rest/v1/${AppModel.tableName}`, { id: `eq.${id}` }, app);
    return new Date(ObjectUpdateResponseSchema.parse(resp.json).updatedAt);
  }

  async updateAppBySlug(slug: string, app: AppUpdateDto): Promise<Date> {
    const payload: { [key: string]: any } = app;
    payload.updatedAt = new Date();
    const resp = await this.request.patch(`/rest/v1/${AppModel.tableName}`, { slug: `eq.${slug}` }, app);
    return new Date(ObjectUpdateResponseSchema.parse(resp.json).updatedAt);
  }

  async updateIcon(id: string, data: FormData): Promise<string> {
    const file: File | null = data.get("file") as unknown as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const resp = await this.request.upload(`/files/${file.name}`, buffer, file.type);
    const payload = {
      icon: {
        __type: "File",
        name: resp.name,
        url: resp.url,
      },
    }
    await this.request.patch(`/rest/v1/${AppModel.tableName}/${id}`, undefined, payload);
    return resp.url;
  }

  async updateIconBySlug(slug: string, data: FormData): Promise<string> {
    const app = await this.getAppBySlug(slug);
    return await this.updateIcon(app.id, data);
  }

  async deleteApp(id: string): Promise<boolean> {
    await this.request.delete(`/rest/v1/${AppModel.tableName}?id=eq.${id}`);
    return true;
  }

  async deleteAppBySlug(slug: string): Promise<boolean> {
    await this.request.delete(`/rest/v1/${AppModel.tableName}?slug=eq.${slug}`);
    return true;
  }

  async setWebhook(slug: string, webhook: WebhookCreateDto): Promise<void> {
    const app = await this.getAppBySlug(slug);    
  }
}
