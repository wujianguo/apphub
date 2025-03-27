import { Readable } from 'stream';
export type PutBody = string | Readable | Buffer | Blob | ArrayBuffer | ReadableStream | File;

export class StorageError implements Error {
  constructor(
    readonly code: number,
    readonly name: string,
    readonly message: string,
  ) { }
}

export interface PutBlobResult {
  url: string;
  downloadUrl: string;
  pathname: string;
  contentType: string;
  contentDisposition: string;
}

// export type ACLType = 'public-read-write' | 'public-read' | 'private';

// export type FileType = 'image' | 'ipa' | 'apk' | 'exe'

export interface FileOptions {
  name: string;
  // type: FileType;
}

export interface UnifiedCloudStorage {
  provider: string;
  requestUpload(key: string, options: FileOptions): Promise<{fileURL: string, uploadURL: string}>;
}
