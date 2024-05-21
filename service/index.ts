import { StorageService } from './storage.service';
import { AppManagerService } from './app.service';
import { auth } from './auth';
import { UnauthorizedError } from '@/lib/exception';

export const storageService = new StorageService();

export async function getAppManager(): Promise<AppManagerService> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }
  const service = new AppManagerService(session.user.id, storageService);
  return service;
}
