import { UnifiedCloudStorage } from "./providers/interface";
import { AmazonS3 } from "./providers/s3";

export function storage(provider: string, config: { [key: string]: string }): UnifiedCloudStorage {
  if (provider === 's3') {
    const forcePathStyle = config.forcePathStyle || '';
    const url = config.url || '';
    const region = config.region || '';
    const bucket = config.bucket || '';
    const endpoint = config.endpoint || '';
    const access_key_id = config.access_key_id || '';
    const secret_access_key = config.secret_access_key || '';
  
    return new AmazonS3(forcePathStyle==='true', url, region, bucket, endpoint, access_key_id, secret_access_key);
  }
  throw new Error("Not Implemented");
}

export function systemStorage(): UnifiedCloudStorage {
  const forcePathStyle = process.env.AMAZON_S3_FORCE_PATH_STYLE || '';
  const url = process.env.AMAZON_S3_URL || '';
  const region = process.env.AMAZON_S3_REGION || '';
  const bucket = process.env.AMAZON_S3_BUCKET || '';
  const endpoint = process.env.AMAZON_S3_ENDPOINT || '';
  const access_key_id = process.env.AMAZON_S3_ACCESS_KEY_ID || '';
  const secret_access_key = process.env.AMAZON_S3_SECRET_ACCESS_KEY || '';
  return new AmazonS3(forcePathStyle==='true', url, region, bucket, endpoint, access_key_id, secret_access_key);
}
