import { z } from "zod";
import { AppCreateDto, AppCreateSchema, AppUpdateDto, WebhookCreateDto } from "../../dto";
import { AppManagerInterface, Pagination } from "../../interface";
import { AppModel } from "../../model";
import { JSONValue } from "../core";
import prisma from "@/lib/prisma";
import { NotFoundError } from "../core/response";

export const AppSupabaseSchema = AppCreateSchema.extend({
  id: z.number(),
  icon: z.string().optional().default(""),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export class AppManagerService implements AppManagerInterface {

  constructor() { }

  toModel(json: JSONValue | undefined): AppModel {
    const data = AppSupabaseSchema.parse(json);
    const model = new AppModel();
    model.fullfill(data);
    model.id = data.id.toString();
    return model;
  }

  async createApp(app: AppCreateDto): Promise<AppModel> {
    const icon = "https://ovgzsknjpyioppdpfnrt.supabase.co/storage/v1/object/public/apphub/apps/google/google.webp";

    const data = await prisma.application.create({
      data: {
        name: app.name,
        slug: app.slug,
        icon: {
          create: {
            name: "google.webp",
            path: icon,
            size: 3858,
          },
        },
        webhook: {
          create: {
            name: `url`,
            type: "url",
            config: {
              url: `https://www.apphub.work/api/webhooks/${app.slug}`
            }
          }
        }
      }
    });
    const model = new AppModel();
    model.name = data.name;
    model.slug = data.slug;
    model.icon = icon;
    model.createdAt = data.createdAt;
    model.updatedAt = data.updatedAt;
    return model;
  }

  async getAppList(page = 1, perPage = 10): Promise<Pagination<AppModel>> {
    const data = await prisma.application.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        icon: true,
      }
    });
    const total = await prisma.application.count();
    return { total, data: data.map((json) => {
      const model = new AppModel();
      model.name = json.name;
      model.slug = json.slug;
      model.icon = json.icon?.path || '';
      model.createdAt = json.createdAt;
      model.updatedAt = json.updatedAt;
      return model;        
    }) };
  }

  async getApp(id: string): Promise<AppModel> {
    const data = await prisma.application.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        icon: true,
      }
    });
    if (!data) {
      throw new NotFoundError();
    }
    const model = new AppModel();
    model.name = data.name;
    model.slug = data.slug;
    model.icon = data.icon?.path || '';
    model.createdAt = data.createdAt;
    model.updatedAt = data.updatedAt;
    return model;
  }

  async getAppBySlug(slug: string): Promise<AppModel> {
    const data = await prisma.application.findUnique({
      where: {
        slug,
      },
      include: {
        icon: true,
      }
    });
    if (!data) {
      throw new NotFoundError();
    }
    const model = new AppModel();
    model.name = data.name;
    model.slug = data.slug;
    model.icon = data.icon?.path || '';
    model.createdAt = data.createdAt;
    model.updatedAt = data.updatedAt;
    return model;
  }

  async updateApp(id: string, app: AppUpdateDto): Promise<Date> {
    const data = await prisma.application.update({
      where: {
        id: parseInt(id),
      },
      data: app,
    });
    return data.updatedAt;
  }

  async updateAppBySlug(slug: string, app: AppUpdateDto): Promise<Date> {
    const data = await prisma.application.update({
      where: {
        slug,
      },
      data: app,
    });
    return data.updatedAt;
  }

  async updateIcon(id: string, data: FormData): Promise<string> {
    return '';
  }

  async updateIconBySlug(slug: string, data: FormData): Promise<string> {
    const app = await this.getAppBySlug(slug);
    return await this.updateIcon(app.id, data);
  }

  async deleteApp(id: string): Promise<boolean> {
    await prisma.application.delete({
      where: {
        id: parseInt(id),
      }
    });
    return true;
  }

  async deleteAppBySlug(slug: string): Promise<boolean> {
    await prisma.application.delete({
      where: {
        slug,
      }
    });
    return true;
  }

  async setWebhook(slug: string, webhook: WebhookCreateDto): Promise<void> {
  }
}
