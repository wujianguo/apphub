import { z } from "zod";

export const AppCreateSchema = z.object({
  name: z.string(),
  slug: z.string(),
});
export const AppUpdateSchema = AppCreateSchema.partial();
export const AppResponseSchema = AppCreateSchema.extend({
  icon: z.string().default(''),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});
export const AppUpdateResponseSchema = z.object({
  updatedAt: z.string().datetime({ offset: true }),
});
export const AppIconResponseSchema = z.object({
  icon: z.string().default(''),
});

export type AppCreateDto = z.infer<typeof AppCreateSchema>;
export type AppUpdateDto = z.infer<typeof AppUpdateSchema>;
export type AppResponseDto = z.infer<typeof AppResponseSchema>;
export type AppUpdateResponseDto = z.infer<typeof AppUpdateResponseSchema>;
export type AppIconResponseDto = z.infer<typeof AppIconResponseSchema>;
