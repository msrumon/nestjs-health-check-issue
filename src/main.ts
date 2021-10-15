import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: { urls: [process.env.RABBITMQ_URI], queue: 'foo' },
    },
    { inheritAppConfig: true },
  );
  app.setGlobalPrefix('api/foo');
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
