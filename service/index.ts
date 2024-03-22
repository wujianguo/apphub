import { StorageService } from './storage.service';
import { AppManagerService } from './app.service';

export const storageService = new StorageService();
export const appManagerService = new AppManagerService(storageService);
