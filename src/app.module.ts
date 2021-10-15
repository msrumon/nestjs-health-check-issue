import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthinessModule } from './healthiness/healthiness.module';
import { Foo, FooSchema } from './schemas/foo.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Foo.name, schema: FooSchema }]),
    HealthinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
