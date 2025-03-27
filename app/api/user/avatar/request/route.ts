import { z } from 'zod';
import { headers } from "next/headers";
import { auth } from '@/lib/auth';
import { generateRandomString } from '@/lib/utils';
import { systemStorage } from '@/lib/storage/server';

const AvatarRequest = z.object({
  name: z.string(),
})

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    return Response.json({ code: 401, message: 'Unauthorized' }, { status: 401 });
  }
  const json = await request.json();
  const body = AvatarRequest.parse(json);
  const userId = session.user.id;
  const ext = body.name.split('.').pop();
  const storage = systemStorage();
  const key = `users/${userId}/avatar-${generateRandomString(4)}.${ext}`;
  const params = await storage.requestUpload(key, { name: body.name });
  return Response.json({ provider: storage.provider, uploadURL: params.uploadURL, fileURL: params.fileURL, path: key });
}
