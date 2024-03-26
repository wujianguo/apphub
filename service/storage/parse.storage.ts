import { RequestService } from "../database/parse";
import { AccessType, FileResponse, StorageInterface } from "../interface/storage.interface";

export class ParseStorage implements StorageInterface {

  constructor(private readonly request: RequestService) { }

  async upload(key: string, filename: string, file: Buffer, contentType = 'application/octet-stream', access: AccessType = 'Public'): Promise<FileResponse> {
    await this.request.upload(`/files/${filename}`, file, contentType);
    return {
      name: filename,
      url: key,
    };
  }

  async delete(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
