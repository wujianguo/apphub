import { z } from "zod";
import { type NextRequest } from "next/server";
import { AppCreateSchema } from "@/service/dto";
import { getAppManager } from "@/service";
import { exceptionHandler } from "@/lib/exception";

const PaginationSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
});

async function getAppList(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const data = {
    page: searchParams.get('page') || undefined,
    perPage: searchParams.get('perPage') || undefined,
  };
  const query = PaginationSchema.parse(data);
  const apps = await (await getAppManager()).getAppList(query.page, query.perPage);
  return Response.json(apps.data.map((app) => app.dto()));
}

async function createApp(req: Request) {
  const body = await req.json();
  const app = await (await getAppManager()).createApp(AppCreateSchema.parse(body));
  return Response.json(app.dto(), { status: 201 });
}

export async function GET(req: Request) {
  return await exceptionHandler(getAppList, req);
}

export async function POST(req: Request) {
  return await exceptionHandler(createApp, req);
}
