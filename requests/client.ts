import { request } from "@/lib/request";
import { AppCreateDto, AppResponseDto, AppResponseSchema } from "@/service/dto";

export async function createApp(app: AppCreateDto): Promise<AppResponseDto> {
  return request("/api/apps", AppResponseSchema, { method: "POST", body: JSON.stringify(app) });
}
