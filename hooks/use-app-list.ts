import { request } from "@/lib/request"
import { AppResponseSchema } from "@/service/dto"
import useSWR from "swr"
import { z } from "zod"

export function useAppList() {
  return useSWR("/api/apps", (url) => request(url, z.array(AppResponseSchema)))
}
