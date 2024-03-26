import { z } from "zod";
import { type NextRequest } from 'next/server';
import { getAppManager, getReleaseService } from "@/service/index";
import { ReleaseCreateSchema } from "@/service/dto";
import { exceptionHandler } from "@/lib/exception";
import { Platform } from '@/service/core/enum';

const PaginationPlatformSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
  platform: z.nativeEnum(Platform).optional(),
});

async function getReleaseList(req: NextRequest, { params }: { params: { slug: string } }) {
  const searchParams = req.nextUrl.searchParams;
  const data = {
    page: searchParams.get('page') || undefined,
    perPage: searchParams.get('perPage') || undefined,
    platform: searchParams.get('platform') || undefined,
  };
  const query = PaginationPlatformSchema.parse(data);
  const app = await getAppManager().getAppBySlug(params.slug);
  const releaseList = await getReleaseService(app).getReleaseList(query.page, query.perPage, query.platform);
  return Response.json(releaseList.data.map((release) => release.dto()));
}

async function createRelease(req: Request, { params }: { params: { slug: string } }) {
  const body = await req.json();
  const app = await getAppManager().getAppBySlug(params.slug);
  const release = await getReleaseService(app).createRelease(ReleaseCreateSchema.parse(body));
  return Response.json(release.dto(), { status: 201 });
}

export async function GET(req: Request, params: { params: { slug: string } }) {
  return await exceptionHandler(getReleaseList, req, params);
}

export async function POST(req: Request, params: { params: { slug: string } }) {
  return await exceptionHandler(createRelease, req, params);
}
