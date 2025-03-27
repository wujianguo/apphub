import { z } from 'zod';
import { Result } from './result';

export type JSONValue = string | number | boolean | null | undefined | { [key: string]: JSONValue } | Array<JSONValue>;

export type HttpMethod = 'GET' | 'POST';

export class HttpError implements Error {
  name: string;
  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly extra: JSONValue | Error | undefined = undefined,
  ) {
    this.name = 'HttpError';
  }
}

export type Query = {
  [key: string]: string | number;
};

export interface HttpRequest {
  /// The request's configuration.
  config: { [key: string]: string } | undefined;

  /// The request's base `URL`.
  baseURL: string;

  /// The path to be appended to `baseURL` to form the full `URL`.
  path: string;

  /// The HTTP method used in the request.
  httpMethod: HttpMethod;

  query: Query | undefined;

  body: JSONValue | undefined;

  /// The headers to be used in the request.
  headers: { [key: string]: string };
}

export interface HttpResponse {
  ok: boolean;

  status: number;

  statusText: string;

  jsonBody: JSONValue | undefined;

  /// The headers to be used in the request.
  headers: { [key: string]: string };
}

async function defaultFetcher(url: string, request: HttpRequest): Promise<HttpResponse> {
  let resp: Response;
  try {
    resp = await fetch(url, {
      method: request.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        ...request.headers,
      },
      body: request.body ? JSON.stringify(request.body) : undefined,
      credentials: 'include',
    });
  } catch (error) {
    console.error(error);
    throw new HttpError(-1, 'Fetche error', error as Error);
  }
  try {
    return {
      ok: resp.ok,
      status: resp.status,
      statusText: resp.statusText,
      jsonBody: await resp.json(),
      headers: {},
    };
  } catch (error) {
    throw new HttpError(resp.status, `${resp.statusText}(${resp.status})`, error as Error);
  }
}

export class RequestClient {
  protected _request: HttpRequest = {
    config: undefined,
    baseURL: '',
    path: '',
    httpMethod: 'GET',
    query: undefined,
    body: undefined,
    headers: {},
  };

  private async _perform<T, O>(schema: z.ZodType<T, z.ZodTypeDef, O>): Promise<Result<z.infer<typeof schema>, HttpError>> {
    const request = this._request;
    const url = this.finalURL();
    const resp = await defaultFetcher(url, request);
    try {
      return Result.ok(schema.parse(resp.jsonBody));
    } catch (error) {
      console.error(error);
      return Result.err(new HttpError(-1, 'Parse error', error as Error));
    }
  }

  baseURL(baseURL: string): RequestClient {
    this._request.baseURL = baseURL;
    return this;
  }

  path(path: string): RequestClient {
    this._request.path = path;
    return this;
  }

  method(method: HttpMethod): RequestClient {
    this._request.httpMethod = method;
    return this;
  }

  query(query: Query): RequestClient {
    this._request.query = query;
    return this;
  }

  body(body: JSONValue): RequestClient {
    this._request.body = body;
    return this;
  }

  get(query: Query = {}): RequestClient {
    return this.method('GET').query(query);
  }

  post(body: JSONValue): RequestClient {
    return this.method('POST').body(body);
  }

  headers(headers: Record<string, string>): RequestClient {
    this._request.headers = headers;
    return this;
  }

  async tryPerform<T, O>(schema: z.ZodType<T, z.ZodTypeDef, O>): Promise<Result<z.infer<typeof schema>, HttpError>> {
    return await this._perform(schema);
  }

  async perform<T, O>(schema: z.ZodType<T, z.ZodTypeDef, O>): Promise<z.infer<typeof schema>> {
    const result = await this._perform(schema);
    if (result.isErr) {
      throw result.error;
    }
    return result.value;
  }

  finalURL(): string {
    const request = this._request;

    let url = request.baseURL + request.path;
    if (request.query) {
      const search = Object.keys(request.query)
        .map((key) => `${key}=${encodeURIComponent(request.query![key])}`)
        .join('&');
      if (search) {
        url += `?${search}`;
      }
    }
    return url;
  }
}

export function requests() {
  return new RequestClient();
}
