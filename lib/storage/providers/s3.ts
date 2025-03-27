import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { FileOptions, UnifiedCloudStorage } from "./interface";

export class AmazonS3 implements UnifiedCloudStorage {
  provider= 's3';
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly url: string;
  constructor(forcePathStyle: boolean, url: string, region: string, bucket: string, endpoint: string, accessKeyId: string, secretAccessKey: string) {
    this.bucket = bucket;
    this.url = url;
    this.client = new S3Client({ forcePathStyle, region, endpoint, credentials: { accessKeyId, secretAccessKey } });
  }

  async requestUpload(key: string, options: FileOptions): Promise<{fileURL: string, uploadURL: string}> {
    const ext = key.split('.').pop();
    let contentDisposition: string | undefined = undefined;
    if (ext === 'ipa' || ext === 'apk' || ext === 'exe') {
      contentDisposition = `attachment; filename="${options.name}"`;
    }
    const command = new PutObjectCommand({ Bucket: this.bucket, Key: key, ACL: 'public-read', ContentDisposition: contentDisposition });
    const uploadURL = await getSignedUrl(this.client, command, { expiresIn: 3600 });
    const fileURL = `${this.url}/${key}`;
    return {
      uploadURL: uploadURL,
      fileURL: fileURL,
    };
  }
}
