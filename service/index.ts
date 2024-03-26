import {
  AppManagerService as ParseAppManagerService,
  ReleaseService as ParseReleaseService,
  RequestService as ParseRequestService,
} from "./database/parse";
import {
  AppManagerService as SupabaseAppManagerService,
  ReleaseService as SupabaseReleaseService,
  RequestService as SupabaseRequestService
} from "./database/supabase";
import {
  AppManagerService as PrismaAppManagerService,
  ReleaseService as PrismaReleaseService
} from "./database/prisma";
import { AppManagerInterface, ReleaseInterface } from "./interface";
import { StorageInterface } from "./interface/storage.interface";
import { AppModel } from "./model";
import { ParseStorage } from "./storage/parse.storage";
import { VercelStorage } from "./storage/vercel.storage";

class Service {
  public readonly appManager!: AppManagerInterface;
  private readonly storage!: StorageInterface;
  constructor() {
    if (process.env.STORAGE === "parse") {
      this.storage = new ParseStorage(new ParseRequestService());
    } else if (process.env.STORAGE === "vercel") {
      this.storage = new VercelStorage();
    }
    if (process.env.DATABASE === "parse") {
      const request = new ParseRequestService();
      this.appManager = new ParseAppManagerService(request);
    } else if (process.env.DATABASE === "supabase") {
      const request = new SupabaseRequestService();
      this.appManager = new SupabaseAppManagerService(request);
    } else if (process.env.DATABASE === "prisma") {
      this.appManager = new PrismaAppManagerService(this.storage);
    } else {
      throw "Database not found";
    }
  }

  getReleaseService(app: AppModel): ReleaseInterface {
    if (process.env.DATABASE === "parse") {
      const request = new ParseRequestService();
      return new ParseReleaseService(request, app);
    } else if (process.env.DATABASE === "supabase") {
      const request = new SupabaseRequestService();
      return new SupabaseReleaseService(request, app);
    } else if (process.env.DATABASE === "prisma") {
      return new PrismaReleaseService(app);
    } else {
      throw "Database not found";
    }
  }
}

const service = new Service();

export const getAppManager = () => service.appManager;
export const getReleaseService = (app: AppModel) => service.getReleaseService(app);
