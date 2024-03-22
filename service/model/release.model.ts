import { ReleaseResponseDto } from "../dto";
import { File } from "../dto/file";
import { BuildType, PlatformType, ReleaseType } from "../dto/enum";

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
  platformType!: PlatformType;
  releaseType!: ReleaseType;
  buildType!: BuildType;
  file!: File;
  icon?: File;
  symbol?: File;
  extra?: any;
  createdAt!: Date;
  updatedAt!: Date;

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
      platform: this.platformType,
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
