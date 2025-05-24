import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { ApplicationService } from "../services/application.service";

@Controller('apps')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
  ) {}

  @Get(':id')
  async getApplication(@Param('id', ParseIntPipe) id: number) {
    const app = await this.applicationService.getApplication(id);
    if (!app) {
      throw new NotFoundException();
    }
    return app;
  }

  @Get('/')
  async getApplications() {
    return this.applicationService.getApplications();
  }
}
