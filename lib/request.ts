import { z } from "zod"
import { HTTPError } from "./exception"
import { Result } from "./result"

const ResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  extra: z.any().optional(),
})

export async function request<T>(url: string, schema: z.ZodType<T>, init?: RequestInit): Promise<T> {
  try {
    const resp = await fetch(url, init)
    const json = await resp.json()
    if (resp.status >= 400) {
      try {
        const error = ResponseSchema.parse(json)
        throw new HTTPError(resp.status, error.message, error.code, error.extra)
      } catch (err) {
        throw new HTTPError(resp.status, resp.statusText, resp.status, json)
      }
    }
    return schema.parse(json)
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error
    }
    if (error instanceof z.ZodError) {
      throw new HTTPError(-2, error.message, -2, error.toString())
    }
    throw new HTTPError(-1, `${error}`, -1)
  }
}

export async function tryRequest<T>(url: string, schema: z.ZodType<T>, init?: RequestInit): Promise<Result<T, HTTPError>> {
  try {
    const data = await request(url, schema, init)
    return Result.ok(data)
  } catch (error) {
    return Result.err(error as HTTPError)
  }
}
