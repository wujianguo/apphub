import { z } from "zod";
import { WebhookType } from "../core/enum";

export const WebhookCreateSchema = z.object({
  url: z.string(),
  template: z.string().optional().default(''),
  name: z.string().optional().default(''),
  type: z.nativeEnum(WebhookType),
  auth: z.any(),
});

export type WebhookCreateDto = z.infer<typeof WebhookCreateSchema>;
