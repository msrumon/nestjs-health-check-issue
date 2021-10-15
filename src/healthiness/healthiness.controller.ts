import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  HealthCheck,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Controller('healthiness')
export class HealthinessController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly microserviceHealthIndicator: MicroserviceHealthIndicator,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async checkHealth() {
    return await this.healthCheckService.check([
      async () =>
        this.microserviceHealthIndicator.pingCheck('broker', {
          transport: Transport.RMQ,
          options: { urls: [process.env.RABBITMQ_URI], queue: 'foo' },
        }),
      async () => this.mongooseHealthIndicator.pingCheck('database'),
    ]);
  }
}
