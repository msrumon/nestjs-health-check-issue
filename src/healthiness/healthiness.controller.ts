import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('healthiness')
export class HealthinessController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async checkHealth() {
    return await this.healthCheckService.check([
      async () => this.mongooseHealthIndicator.pingCheck('database'),
    ]);
  }
}
