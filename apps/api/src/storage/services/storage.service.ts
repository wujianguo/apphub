import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class StorageService {
  constructor(private readonly prismaService: PrismaService) { }

  async getStorageConfig(organizationId: string): Promise<{ provider: string }> {
    const organizationSetting = await this.prismaService.organizationSetting.findUnique({
      where: {
        organizationId: organizationId
      },
      include: {
        storage: true
      }
    });
    return organizationSetting.storage;
  }
}
