import { Platform } from "../core/enum";
import { ReleaseCreateDto } from "../dto";
import { ReleaseModel } from "../model/index";
import { Pagination } from "../core/pagination";

export interface ReleaseInterface {

  createRelease(release: ReleaseCreateDto): Promise<ReleaseModel>;

  getReleaseList(page: number, perPage: number, platform?: Platform): Promise<Pagination<ReleaseModel>>;

  getRelease(index: number): Promise<ReleaseModel>;

  getLatest(tryPlatform?: Platform): Promise<ReleaseModel>;
}
