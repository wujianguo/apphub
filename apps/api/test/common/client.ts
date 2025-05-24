import request from 'supertest';
import { AppContext } from './app';
import { json } from 'stream/consumers';

export type JsonType = string | number | boolean | null | undefined | { [key: string]: JsonType } | Array<JsonType>;

export type QueryType = {
  [key: string]: string;
};

export class UserClient {
  private context: AppContext;

  constructor(context: AppContext) {
    this.context = context;
  }

  url(path: string, query: QueryType = {}) {
    const prefix = path.startsWith('/') ? '' : '/';
    return `${prefix}${path}?${new URLSearchParams(query).toString()}`;
  }

  get(path: string, query: QueryType = {}) {
    const uri = this.url(path, query);
    const req = request(this.context.app.getHttpServer()).get(uri);
    return req;
  }

  post(path: string, query: QueryType = {}, data: JsonType = null) {
    const uri = this.url(path, query);
    const req = request(this.context.app.getHttpServer()).post(uri).send(data ? JSON.stringify(data) : null);
    return req;
  }

  patch(path: string, query: QueryType = {}, data: JsonType = null) {
    const uri = this.url(path, query);
    const req = request(this.context.app.getHttpServer()).patch(uri).send(data ? JSON.stringify(data) : null);
    return req;
  }

  delete(path: string, query: QueryType = {}) {
    const uri = this.url(path, query);
    const req = request(this.context.app.getHttpServer()).delete(uri);
    return req;
  }
}
