import { getAppManager } from "@/service/index";
import { exceptionHandler } from "@/lib/exception";
import { AppUpdateResponseSchema } from "@/service/dto/app.dto";

async function getApp(req: Request, { params }: { params: { slug: string } }) {
  const app = await getAppManager().getAppBySlug(params.slug);
  return Response.json(app.dto());
}

async function updateApp(req: Request, { params }: { params: { slug: string } }) {
  const updatedAt = await getAppManager().updateAppBySlug(params.slug, await req.json());
  return Response.json(AppUpdateResponseSchema.parse({ updatedAt: updatedAt.toISOString() }));
}

export async function GET(req: Request, params: { params: { slug: string } }) {
  return await exceptionHandler(getApp, req, params);
}

export async function PUT(req: Request, params: { params: { slug: string } }) {
  return await exceptionHandler(updateApp, req, params);
}
