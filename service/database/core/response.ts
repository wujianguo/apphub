export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

export class HTTPError extends Error {
  public readonly statusCode: number;
  public readonly code: number;
  public readonly extra: JSONValue | undefined;
  constructor(statusCode: number, message: string, code: number, extra: JSONValue | undefined = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HTTPError';
    this.code = code;
    this.extra = extra;
    this.cause = undefined;
  }

  dto() {
    return {
      code: this.code,
      message: this.message,
      extra: this.extra,
    };
  }
}

export class DatabaseError extends HTTPError {
  constructor(statusCode: number, code: number, message: string, extra: JSONValue | undefined = undefined) {
    super(statusCode, message, code, extra);
    this.name = 'DatabaseError';
  }
}

export class NotFoundError extends HTTPError {
  constructor() {
    super(404, 'Not found', 404);
    this.name = 'NotFoundError';
  }
}

export class HttpResponse {
  constructor(
    public readonly ok: boolean,
    public readonly status: number,
    public readonly statusText: string,
    public readonly headers: Headers,
    public readonly text: string | undefined,
    public readonly json: JSONValue | undefined) { }
}
