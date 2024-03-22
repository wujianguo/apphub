import { z } from "zod";
import prisma from "@/lib/prisma";
import { AppCreateDto, AppCreateSchema, AppUpdateDto, Pagination } from "./dto";
import { AppModel } from "./model";
import { StorageService } from "./storage.service";
import { NotFoundError } from "@/lib/exception";

export const AppPrismaSchema = AppCreateSchema.extend({
  id: z.number(),
  icon: z.string().optional().default(""),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

type AppPrismaType = {
  id: string;
  name: string;
  slug: string;
  icon?: {
    path: string;
  } | null | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export class AppManagerService {

  constructor(private readonly storage: StorageService) { }

  toModel(data: AppPrismaType): AppModel {
    const model = new AppModel();
    model.id = data.id;
    model.name = data.name;
    model.slug = data.slug;
    model.createdAt = data.createdAt;
    model.updatedAt = data.updatedAt;
    return model;
  }

  async createApp(app: AppCreateDto): Promise<AppModel> {
    const data = await prisma.application.create({
      data: {
        name: app.name,
        slug: app.slug,
      }
    });
    return this.toModel(data);
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
    return {
      total, data: data.map((json) => {
        return this.toModel(json);
      })
    };
  }

  async getApp(id: string): Promise<AppModel> {
    const data = await prisma.application.findUnique({
      where: {
        id: id,
      },
      include: {
        icon: true,
      }
    });
    if (!data) {
      throw new NotFoundError();
    }
    return this.toModel(data);
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
    return this.toModel(data);
  }

  async updateApp(id: string, app: AppUpdateDto): Promise<Date> {
    const data = await prisma.application.update({
      where: {
        id: id,
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
    const file: File | null = data.get('file') as unknown as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const resp = await this.storage.upload(`/apps/${id}/${file.name}`, file.name, buffer, file.type, 'Public');

    await prisma.application.update({
      where: {
        id: id,
      },
      data: {
        icon: {
          create: {
            name: resp.name,
            path: resp.url, 
            size: file.size,           
          }
        }
      }
    });

    return resp.url;
  }

  async updateIconBySlug(slug: string, data: FormData): Promise<string> {
    const app = await this.getAppBySlug(slug);
    return await this.updateIcon(app.id, data);
  }

  async deleteApp(id: string): Promise<boolean> {
    await prisma.application.delete({
      where: {
        id: id,
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

  // async setWebhook(slug: string, webhook: WebhookCreateDto): Promise<void> {
  //   const app = await this.getAppBySlug(slug);
  //   await prisma.application.update({
  //     where: {
  //       id: app.id,
  //     },
  //     data: {
  //       webhook: {
  //         create: {
  //           name: webhook.name || "webhook",
  //           type: webhookTypeToInt(webhook.type),
  //           config: {},
  //         }
  //       }
  //     }
  //   });
  // }
}
