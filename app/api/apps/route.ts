import { z } from "zod";
import { NextResponse, type NextRequest } from "next/server";
import { AppCreateSchema } from "@/service/dto";
import { getAppManager } from "@/service";
import { UnauthorizedError, exceptionHandler } from "@/lib/exception";
import { auth } from "@/service/auth";
import { NextApiRequest, NextApiResponse } from "next/types";
import { NextAuthRequest } from "next-auth/lib";

const PaginationSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
});

async function getAppList(req: NextRequest): Promise<NextResponse> {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    throw new UnauthorizedError();
  }
  const searchParams = req.nextUrl.searchParams;
  const data = {
    page: searchParams.get('page') || undefined,
    perPage: searchParams.get('perPage') || undefined,
  };
  const query = PaginationSchema.parse(data);
  const apps = await getAppManager(userId).getAppList(query.page, query.perPage);
  return NextResponse.json(apps.data.map((app) => app.dto()));
}

async function createApp(req: NextRequest) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    throw new UnauthorizedError();
  }
  const body = await req.json();
  const app = await getAppManager(userId).createApp(AppCreateSchema.parse(body));
  return Response.json(app.dto(), { status: 201 });
}

export async function GET(req: Request) {
  return await exceptionHandler(getAppList, req);
}

export async function POST(req: Request) {
  return await exceptionHandler(createApp, req);
}
