import { Test, TestingModule } from '@nestjs/testing';
import { HealthinessController } from './healthiness.controller';

describe('HealthinessController', () => {
  let controller: HealthinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthinessController],
    }).compile();

    controller = module.get<HealthinessController>(HealthinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
