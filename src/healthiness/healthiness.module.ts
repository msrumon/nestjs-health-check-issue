import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthinessController } from './healthiness.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthinessController],
})
export class HealthinessModule {}
