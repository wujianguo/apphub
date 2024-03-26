import { put } from '@vercel/blob';
import { AccessType, FileResponse, StorageInterface } from "../interface/storage.interface";

export class VercelStorage implements StorageInterface {

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
    await put(key, file, {
      contentType,
      access: this.castAccess(access),
    });
    return {
      name: filename,
      url: key,
    };
  }

  async delete(key: string): Promise<boolean> {
      throw new Error('Method not implemented.');
  }
}
