import { ReleaseInterface, Pagination } from "../../interface";
import { ReleaseCreateDto } from "../../dto";
import { PlatformType } from "../../core/enum";
import { RequestService } from "./request.service";
import { AppModel, ReleaseModel } from "../../model";

export class ReleaseService implements ReleaseInterface {

  constructor(
    private readonly request: RequestService,
    private readonly app: AppModel) { }

  createRelease(app: ReleaseCreateDto): Promise<ReleaseModel> {
    throw new Error("Method not implemented.");
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