import {
  AppManagerService as ParseAppManagerService,
  ReleaseService as ParseReleaseService,
  RequestService as ParseRequestService,
} from "./adapter/parse";
import {
  AppManagerService as SupabaseAppManagerService,
  ReleaseService as SupabaseReleaseService,
  RequestService as SupabaseRequestService
} from "./adapter/supabase";
import { AppManagerInterface, ReleaseInterface } from "./interface";
import { AppModel } from "./model";

class Service {
  public readonly appManager!: AppManagerInterface;
  constructor() {
    if (process.env.DATABASE === "parse") {
      const request = new ParseRequestService();
      this.appManager = new ParseAppManagerService(request);
    } else if (process.env.DATABASE === "supabase") {
      const request = new SupabaseRequestService();
      this.appManager = new SupabaseAppManagerService(request);
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
    } else {
      throw "Database not found";
    }
  }
}

const service = new Service();

export const getAppManager = () => service.appManager;
export const getReleaseService = (app: AppModel) => service.getReleaseService(app);
