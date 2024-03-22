import { z } from "zod";

export const FileResponseSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export type FileResponse = z.infer<typeof FileResponseSchema>;

export type AccessType = 'Public' | 'Private';

export class StorageService {

  castAccess(access: AccessType): 'public' {
    if (access === 'Public') {
      return 'public';
    } else if (access == 'Private') {
      throw new Error('Invalid access type');
      // return 'private';
    } else {
      throw new Error('Invalid access type');
    }
  }

  async upload(key: string, filename: string, file: Buffer, contentType = 'application/octet-stream', access: AccessType = 'Public'): Promise<FileResponse> {
    return {
      name: filename,
      url: key,
    };
  }

  async delete(key: string): Promise<boolean> {
      throw new Error('Method not implemented.');
  }
}
