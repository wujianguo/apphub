import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ApplicationCreateDto, ApplicationModel } from '@repo/api/application'

@Injectable()
export class ApplicationService {
  constructor(private readonly prismaService: PrismaService) { }


  async getApplication(id: number): Promise<ApplicationModel | null> {
    return await this.prismaService.application.findUnique({
      where: {
        id: id
      },
      include: {
        logo: true
      }
    })
  }

  async getApplications(): Promise<ApplicationModel[]> {
    const apps = await this.prismaService.application.findMany({
      include: {
        logo: true
      }
    });
    return apps;
  }

  async createApplication(organizationId: string, dto: ApplicationCreateDto): Promise<ApplicationModel> {
    return await this.prismaService.application.create({
      data: {
        ...dto,
        organization: {
          connect: {
            id: organizationId
          }
        },
        logo: {
          connect: {
            id: 1
          }
        }
      },
      include: {
        logo: true
      }
    });
  }
}
