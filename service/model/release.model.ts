import { ReleaseResponseDto } from "../dto";
import { File } from "../core/file";
import { BuildType, Platform, ReleaseType } from "../core/enum";

export class ReleaseModel {
  static readonly tableName = "Release";
  id = "";
  name = "";
  index = 0;
  fingerprint = "";
  version = "";
  shortVersion = "";
  bundleIdentifier = "";
  description = "";
  commitId = "";
  minimumPlatformVersion = "";
  platform!: Platform;
  releaseType!: ReleaseType;
  buildType!: BuildType;
  file!: File;
  icon?: File;
  symbol?: File;
  extra?: any;
  createdAt!: Date;
  updatedAt!: Date;

  fullfill(data: Partial<ReleaseResponseDto>) {
    Object.assign(this, data);
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    } else {
      this.createdAt = new Date();
    }
    if (data.updatedAt) {
      this.updatedAt = new Date(data.updatedAt);
    } else {
      this.updatedAt = new Date();
    }
  }

  dto(): ReleaseResponseDto {
    return {
      name: this.name,
      index: this.index,
      fingerprint: this.fingerprint,
      version: this.version,
      shortVersion: this.shortVersion,
      bundleIdentifier: this.bundleIdentifier,
      description: this.description,
      commitId: this.commitId,
      minimumPlatformVersion: this.minimumPlatformVersion,
      platform: this.platform,
      releaseType: this.releaseType,
      buildType: this.buildType,
      file: this.file,
      icon: this.icon,
      symbol: this.symbol,
      extra: this.extra,
      updatedAt: this.updatedAt.toISOString(),
      createdAt: this.createdAt.toISOString(),
    };
  }
}
