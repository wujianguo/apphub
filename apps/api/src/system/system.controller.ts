import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('system')
export class SystemController {
  constructor(
    private readonly health: HealthCheckService,
  ) {}

  @Get('health')
  @HealthCheck()
  async check() {
    return this.health.check([]);
  }
}
