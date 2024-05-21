import { z } from "zod";
import prisma from "@/lib/prisma";
import { AppCreateDto, AppCreateSchema, AppUpdateDto, Pagination } from "./dto";
import { AppModel } from "./model";
import { StorageService } from "./storage.service";
import { NotFoundError } from "@/lib/exception";
import { AppMemberRole, appMemberRoleToInt } from "./dto/enum";

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

  constructor(private readonly userId: string, private readonly storage: StorageService) { }

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
    const data = await prisma.appMember.create({
      data: {
        user: {
          connect: {
            id: this.userId,
          }
        },
        role: appMemberRoleToInt(AppMemberRole.Owner),
        application: {
          create: {
            name: app.name,
            slug: app.slug,
          }
        }
      },
      include: {
        application: {
          include: {
            icon: true,
          }
        }
      }
    });
    return this.toModel(data.application);
  }

  async getAppList(page = 1, perPage = 100): Promise<Pagination<AppModel>> {
    const data = await prisma.appMember.findMany({
      where: {
        userId: this.userId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        application: {
          include: {
            icon: true,
          }
        }
      }
    });
    const total = await prisma.appMember.count({
      where: {
        userId: this.userId,
      }
    });
    return {
      total, data: data.map((json) => {
        return this.toModel(json.application);
      })
    };
  }

  async getApp(id: string): Promise<AppModel> {
    const data = await prisma.appMember.findUnique({
      where: {
        userId_applicationId: {
          userId: this.userId,
          applicationId: id,
        }
      },
      include: {
        application: {
          include: {
            icon: true,
          }
        }
      }
    });
    if (!data) {
      throw new NotFoundError();
    }
    return this.toModel(data.application);
  }

  async getAppBySlug(slug: string): Promise<AppModel> {
    const data = await prisma.application.findUnique({
      where: {
        slug,
      },
    });
    if (!data) {
      throw new NotFoundError();
    }
    return this.getApp(data.id);
  }

  async updateApp(id: string, app: AppUpdateDto): Promise<Date> {
    await prisma.appMember.update({
      where: {
        userId_applicationId: {
          userId: this.userId,
          applicationId: id,
        },
        role: {
          in: [appMemberRoleToInt(AppMemberRole.Owner), appMemberRoleToInt(AppMemberRole.Manager)],
        },
      },
      data: {
        application: {
          update: app,
        }
      }
    });
    const data = await prisma.application.update({
      where: {
        id: id,
      },
      data: app,
    });
    return data.updatedAt;
  }

  async updateAppBySlug(slug: string, app: AppUpdateDto): Promise<Date> {
    const data = await prisma.application.findUnique({
      where: {
        slug,
      },
    });
    if (!data) {
      throw new NotFoundError();
    }
    return this.updateApp(data.id, app);
  }

  async updateIcon(id: string, data: FormData): Promise<string> {
    const app = await prisma.appMember.findUnique({
      where: {
        userId_applicationId: {
          userId: this.userId,
          applicationId: id,
        },
        role: {
          in: [appMemberRoleToInt(AppMemberRole.Owner), appMemberRoleToInt(AppMemberRole.Manager)],
        },
      }
    });
    if (!app) {
      throw new NotFoundError();
    }

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
    const app = await prisma.application.findUnique({
      where: {
        slug,
      },
    });
    if (!app) {
      throw new NotFoundError();
    }
    return await this.updateIcon(app.id, data);
  }

  async deleteApp(id: string): Promise<boolean> {
    const app = await prisma.appMember.findUnique({
      where: {
        userId_applicationId: {
          userId: this.userId,
          applicationId: id,
        },
        role: {
          equals: appMemberRoleToInt(AppMemberRole.Owner),
        },
      }
    });
    if (!app) {
      throw new NotFoundError();
    }
    await prisma.application.delete({
      where: {
        id: id,
      }
    });
    return true;
  }

  async deleteAppBySlug(slug: string): Promise<boolean> {
    const app = await prisma.application.findUnique({
      where: {
        slug,
      },
    });
    if (!app) {
      throw new NotFoundError();
    }
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
