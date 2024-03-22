import { z } from "zod";

export const FileSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  size: z.number().gt(0),
});

export type File = z.infer<typeof FileSchema>;
