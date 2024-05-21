export enum PlatformType {
  Android = 'Android',
  iOS = 'iOS',
};

export enum ReleaseType {
  Alpha = 'Alpha',
  Beta = 'Beta',
};

export enum BuildType {
  Debug = 'Debug',
  Release = 'Release',
};

export enum WebhookType {
  URL = 'URL',
}

export enum AppMemberRole {
  // 1. owner 2. manager 3. member
  Owner = 'Owner',
  Manager = 'Manager',
  Member = 'Member',
}

export function platformTypeToInt(platform: PlatformType): number {
  switch (platform) {
    case PlatformType.Android:
      return 1;
    case PlatformType.iOS:
      return 2;
    default:
      throw new Error('Invalid platform type');
  }
}

export function intToPlatformType(platform: number): PlatformType {
  switch (platform) {
    case 1:
      return PlatformType.Android;
    case 2:
      return PlatformType.iOS;
    default:
      throw new Error('Invalid platform type');
  }
}

export function releaseTypeToInt(releaseType: ReleaseType): number {
  switch (releaseType) {
    case ReleaseType.Alpha:
      return 1;
    case ReleaseType.Beta:
      return 2;
    default:
      throw new Error('Invalid release type');
  }
}

export function intToReleaseType(releaseType: number): ReleaseType {
  switch (releaseType) {
    case 1:
      return ReleaseType.Alpha;
    case 2:
      return ReleaseType.Beta;
    default:
      throw new Error('Invalid release type');
  }
}

export function buildTypeToInt(buildType: BuildType): number {
  switch (buildType) {
    case BuildType.Debug:
      return 1;
    case BuildType.Release:
      return 2;
    default:
      throw new Error('Invalid build type');
  }
}

export function intToBuildType(buildType: number): BuildType {
  switch (buildType) {
    case 1:
      return BuildType.Debug;
    case 2:
      return BuildType.Release;
    default:
      throw new Error('Invalid build type');
  }
}

export function webhookTypeToInt(webhookType: WebhookType): number {
  switch (webhookType) {
    case WebhookType.URL:
      return 1;
    default:
      throw new Error('Invalid webhook type');
  }
}

export function intToWebhookType(webhookType: number): WebhookType {
  switch (webhookType) {
    case 1:
      return WebhookType.URL;
    default:
      throw new Error('Invalid webhook type');
  }
}

export function appMemberRoleToInt(role: AppMemberRole): number {
  switch (role) {
    case AppMemberRole.Owner:
      return 1;
    case AppMemberRole.Manager:
      return 2;
    case AppMemberRole.Member:
      return 3;
    default:
      throw new Error('Invalid app member role');
  }
}

export function intToAppMemberRole(role: number): AppMemberRole {
  switch (role) {
    case 1:
      return AppMemberRole.Owner;
    case 2:
      return AppMemberRole.Manager;
    case 3:
      return AppMemberRole.Member;
    default:
      throw new Error('Invalid app member role');
  }
}
