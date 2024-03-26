import prisma from "@/lib/prisma";
import { ReleaseInterface, Pagination } from "../../interface";
import { ReleaseCreateDto } from "../../dto";
import { PlatformType, buildTypeToInt, platformTypeToInt, releaseTypeToInt } from "../../core/enum";
import { AppModel, ReleaseModel } from "../../model";

export class ReleaseService implements ReleaseInterface {

  constructor(
    private readonly app: AppModel) { }

  async createRelease(release: ReleaseCreateDto): Promise<ReleaseModel> {
    const data = await prisma.release.create({
      data: {
        name: release.name,
        fingerprint: release.fingerprint,
        version: release.version,
        shortVersion: release.shortVersion,
        bundleIdentifier: release.bundleIdentifier,
        description: release.description,
        commitId: release.commitId,
        minimumPlatformVersion: release.minimumPlatformVersion,
        platformType: platformTypeToInt(release.platform),
        releaseType: releaseTypeToInt(release.releaseType),
        buildType: buildTypeToInt(release.buildType),
        applicationId: parseInt(this.app.id),
        file: {
          create: {
            name: release.file.name,
            path: release.file.url,
            size: release.file.size,
          }
        }
      }
    });
    const model = new ReleaseModel();
    model.fullfill(release);
    model.id = data.id.toString();
    model.createdAt = data.createdAt;
    model.updatedAt = data.updatedAt;
    return model;
  }

  getReleaseList(page = 1, perPage = 10, platform?: PlatformType): Promise<Pagination<ReleaseModel>> {
    throw new Error("Method not implemented.");
  }

  getRelease(index: number): Promise<ReleaseModel> {
    throw new Error("Method not implemented.");
  }

  getLatest(tryPlatform: PlatformType): Promise<ReleaseModel> {
    throw new Error("Method not implemented.");
  }
}