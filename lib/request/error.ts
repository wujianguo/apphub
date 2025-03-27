export class HttpError implements Error {
  name: string;
  constructor(
    public readonly code: number,
    public readonly message: string,
  ) {
    this.name = 'HttpError';
  }
}
