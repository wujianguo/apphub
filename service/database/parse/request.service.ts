import { z } from "zod";
import { DatabaseError, HttpResponse, JSONValue } from "../core";

const ParseError = z.object({
  code: z.number(),
  error: z.string(),
});

const ParseArray = z.object({
  results: z.array(z.any()),
});

export const ObjectCreateResponseSchema = z.object({
  objectId: z.string(),
  createdAt: z.string().datetime({ offset: true }),
});

export const ObjectUpdateResponseSchema = z.object({
  updatedAt: z.string().datetime({ offset: true }),
});

export type ObjectUpdateResponse = z.infer<typeof ObjectUpdateResponseSchema>;

export const FileResponseSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export type FileResponse = z.infer<typeof FileResponseSchema>;

export class RequestService {
  private serverURL: string;
  private appId: string;
  private masterKey: string;
  constructor() {
    this.appId = process.env.PARSE_APP_ID || '';
    this.masterKey = process.env.PARSE_MASTER_KEY || '';
    this.serverURL = process.env.PARSE_SERVER_URL || '';
  }

  headers(useMaster = false): Record<string, string> {
    if (useMaster) {
      return {
        'X-Parse-Application-Id': this.appId,
        'X-Parse-Master-Key': this.masterKey,
      };
    }
    return {
      'X-Parse-Application-Id': this.appId,
    };
  }

  array(json: JSONValue | undefined): JSONValue[] {
    if (!json) {
      return [];
    }
    return ParseArray.parse(json).results;
  }

  async response(resp: globalThis.Response): Promise<HttpResponse> {
    let json: JSONValue | undefined = undefined;
    try {
      json = await resp.json();
    } catch (error) {
      console.error(error);
    }
    if (!resp.ok) {
      console.error(json);
      const error = ParseError.parse(json);
      throw new DatabaseError(resp.status, error.code, error.error);
    }
  
    let text: string | undefined = undefined;
    // try {
    //   text = await resp.text();
    // } catch (error) {
    //   console.error(error);  
    // }
    return new HttpResponse(resp.ok, resp.status, resp.statusText, resp.headers, text, json);
  }

  async get(endpoint: string, query: Record<string, string> | undefined = undefined): Promise<HttpResponse> {
    let url = `${this.serverURL}${endpoint}`;
    if (query) {
      const params = new URLSearchParams(query);
      url = `${url}?${params.toString()}`;
    }
    console.log(url);
    const resp = await fetch(url, { headers: this.headers() });
    return await this.response(resp);
  }

  async post(endpoint: string, body: JSONValue | undefined = undefined, useMaster = false): Promise<HttpResponse> {
    const resp = await fetch(`${this.serverURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers(useMaster),
      },
      body: JSON.stringify(body),
    });
    return await this.response(resp);
  }

  async upload(endpoint: string, file: Buffer, contentType = 'application/octet-stream'): Promise<FileResponse> {
    const resp = await fetch(`${this.serverURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        ...this.headers(true),
      },
      body: file,
    });
    const data = await this.response(resp)
    return FileResponseSchema.parse(data.json);
  }

  async put(endpoint: string, body: JSONValue | undefined = undefined, useMaster = false): Promise<HttpResponse> {
    const resp = await fetch(`${this.serverURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers(useMaster),
      },
      body: JSON.stringify(body),
    });
    return await this.response(resp);
  }

  async delete(endpoint: string, useMaster = false): Promise<HttpResponse> {
    const resp = await fetch(`${this.serverURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers(useMaster),
    });
    return await this.response(resp);
  }
}
