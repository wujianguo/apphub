import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('system')
export class SystemController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  async check() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 100 * 1024 * 1024),
    ]);
  }
}
