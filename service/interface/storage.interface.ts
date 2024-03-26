import { z } from "zod";

export const FileResponseSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export type FileResponse = z.infer<typeof FileResponseSchema>;

export type AccessType = 'Public' | 'Private';

export interface StorageInterface {
  upload(key: string, filename: string, file: Buffer, contentType: string, access: AccessType): Promise<FileResponse>;

  delete(key: string): Promise<boolean>;
}
