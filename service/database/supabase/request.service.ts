import { z } from "zod";
import { DatabaseError, HttpResponse, JSONValue } from "../core";
import { NotFoundError } from "../core/response";

const SupabaseError = z.object({
  code: z.string().optional(),
  message: z.string(),
});

const SupabaseArray = z.array(z.any());

export const ObjectCreateResponseSchema = z.object({
  id: z.number(),
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
  private key: string;
  constructor() {
    this.key = process.env.SUPABASE_KEY || '';
    this.serverURL = process.env.SUPABASE_URL || '';
  }

  headers(): Record<string, string> {
    return {
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`,
    };
  }

  array(json: JSONValue | undefined): JSONValue[] {
    if (!json) {
      return [];
    }
    return SupabaseArray.parse(json);
  }

  async response(resp: globalThis.Response): Promise<HttpResponse> {
    let json: JSONValue | undefined = undefined;
    try {
      json = await resp.json();
    } catch (error) {
      console.error(error);
      // const text = await resp.text();
      // console.error(text);
    }
    // console.log(json);
    // console.log(resp.status);
    if (!resp.ok) {
      // console.log('=====not ok');
      const error = SupabaseError.parse(json);
      throw new DatabaseError(resp.status, resp.status, error.message, error);
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
    const resp = await fetch(url, { headers: this.headers() });
    return await this.response(resp);
  }

  async getObject(endpoint: string, query: Record<string, string> | undefined = undefined): Promise<HttpResponse> {
    let url = `${this.serverURL}${endpoint}`;
    if (query) {
      const params = new URLSearchParams(query);
      url = `${url}?${params.toString()}`;
    }
    const headers = { ...this.headers(), 'Range': '0-0' }
    const resp = await fetch(url, { headers });
    const resp2 = await this.response(resp);
    const json = this.array(resp2.json);
    if (json.length === 0) {
      throw new NotFoundError();
    }
    return new HttpResponse(resp2.ok, resp2.status, resp2.statusText, resp2.headers, resp2.text, json[0]);
  }

  async post(endpoint: string, body: JSONValue | undefined = undefined): Promise<HttpResponse> {
    const resp = await fetch(`${this.serverURL}${endpoint}?select=id,createdAt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...this.headers(),
      },
      body: JSON.stringify(body),
    });
    const resp2 = await this.response(resp);
    const json = this.array(resp2.json);
    if (json.length === 0) {
      throw new NotFoundError();
    }
    return new HttpResponse(resp2.ok, resp2.status, resp2.statusText, resp2.headers, resp2.text, json[0]);
  }

  async upload(endpoint: string, file: Buffer, contentType = 'application/octet-stream'): Promise<FileResponse> {
    const resp = await fetch(`${this.serverURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        ...this.headers(),
      },
      body: file,
    });
    const data = await this.response(resp)
    return FileResponseSchema.parse(data.json);
  }

  async patch(endpoint: string, query: Record<string, string> | undefined = undefined, body: JSONValue | undefined = undefined): Promise<HttpResponse> {
    let url = `${this.serverURL}${endpoint}`;
    if (query) {
      const params = new URLSearchParams(query);
      url = `${url}?${params.toString()}&select=updatedAt`;
    } else {
      url = `${url}?select=updatedAt`
    }
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...this.headers(),
      },
      body: JSON.stringify(body),
    });
    const resp2 = await this.response(resp);
    const json = this.array(resp2.json);
    if (json.length === 0) {
      throw new NotFoundError();
    }
    return new HttpResponse(resp2.ok, resp2.status, resp2.statusText, resp2.headers, resp2.text, json[0]);
  }

  async delete(endpoint: string): Promise<HttpResponse> {
    const resp = await fetch(`${this.serverURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers(),
    });
    return await this.response(resp);
  }
}
