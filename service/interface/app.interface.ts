import { AppCreateDto, AppUpdateDto, WebhookCreateDto } from "../dto";
import { AppModel } from "../model/index";
import { Pagination } from "../core/pagination";

export interface AppManagerInterface {
  createApp(app: AppCreateDto): Promise<AppModel>;

  getAppList(page: number, perPage: number): Promise<Pagination<AppModel>>;

  getApp(id: string): Promise<AppModel>;

  getAppBySlug(slug: string): Promise<AppModel>;

  updateApp(id: string, app: AppUpdateDto): Promise<Date>;

  updateAppBySlug(slug: string, app: AppUpdateDto): Promise<Date>;

  updateIcon(id: string, data: FormData): Promise<string>;

  updateIconBySlug(slug: string, data: FormData): Promise<string>;

  deleteApp(id: string): Promise<boolean>;

  deleteAppBySlug(slug: string): Promise<boolean>;

  setWebhook(slug: string, webhook: WebhookCreateDto): Promise<void>;
}
