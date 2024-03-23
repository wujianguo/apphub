import { ReleaseInterface, Pagination } from "../../interface";
import { ReleaseCreateDto } from "../../dto";
import { Platform } from "../../core/enum";
import { AppModel, ReleaseModel } from "../../model";

export class ReleaseService implements ReleaseInterface {

  constructor(
    private readonly app: AppModel) { }

  createRelease(app: ReleaseCreateDto): Promise<ReleaseModel> {
    throw new Error("Method not implemented.");
  }

  getReleaseList(page = 1, perPage = 10, platform?: Platform): Promise<Pagination<ReleaseModel>> {
    throw new Error("Method not implemented.");
  }

  getRelease(index: number): Promise<ReleaseModel> {
    throw new Error("Method not implemented.");
  }

  getLatest(tryPlatform: Platform): Promise<ReleaseModel> {
    throw new Error("Method not implemented.");
  }
}