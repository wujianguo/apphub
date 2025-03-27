import { z } from "zod";
import { HttpError, requests } from "../request";

export type PutBody = string | Buffer | Blob | ArrayBuffer | ReadableStream | File;

export interface FileResult {
  path: string;
  url: string;
  size: number;
}

export async function upload(body: PutBody, name: string, api: string): Promise<FileResult> {
  const resp = await requests().path(api).post({name}).perform(z.object({path: z.string(), fileURL:z.string(), uploadURL: z.string(), provider: z.string()}));
  if (resp.provider === 's3') {
    try {
      // const url = resp.url.replace('apphub.', '');
      const putResponse = await fetch(resp.uploadURL, {method: 'PUT', body: body});
      if (!putResponse.ok) {
        throw new HttpError(putResponse.status, putResponse.statusText);
      }
    } catch (error) {
      console.error(error);
      throw new HttpError(400, `${error}`);
    }
    return {
      path: resp.path,
      url: resp.fileURL,
      size: 0, // todo: file size
    };
  } else {
    throw new HttpError(501, 'Not Implemented', resp);
  }
}
