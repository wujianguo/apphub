import { z } from "zod";
import { FileSchema } from "./file";
import { BuildType, PlatformType, ReleaseType } from "./enum";

export const ReleaseCreateSchema = z.object({
  name: z.string(),
  fingerprint: z.string().default(''),
  version: z.string(),
  shortVersion: z.string(),
  bundleIdentifier: z.string(),
  description: z.string().default(''),
  commitId: z.string().default(''),
  minimumPlatformVersion: z.string().default(''),
  platform: z.nativeEnum(PlatformType),
  releaseType: z.nativeEnum(ReleaseType),
  buildType: z.nativeEnum(BuildType),
  file: FileSchema,
  icon: FileSchema.optional(),
  symbol: FileSchema.optional(),
});
export const ReleaseResponseSchema = ReleaseCreateSchema.extend({
  index: z.number(),
  extra: z.any().optional(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type ReleaseCreateDto = z.infer<typeof ReleaseCreateSchema>;
export type ReleaseResponseDto = z.infer<typeof ReleaseResponseSchema>;
