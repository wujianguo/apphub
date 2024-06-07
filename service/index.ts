import { StorageService } from './storage.service';
import { AppManagerService } from './app.service';

export const storageService = new StorageService();

export function getAppManager(userId: string): AppManagerService {
  return new AppManagerService(userId, storageService);
}
