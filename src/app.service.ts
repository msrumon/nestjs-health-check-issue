import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Foo, FooDocument } from './schemas/foo.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Foo.name)
    private readonly fooModel: Model<FooDocument>,
  ) {}

  async fetchData(): Promise<Foo[]> {
    return await this.fooModel.find().exec();
  }

  async storeData(data: object): Promise<Foo> {
    const foo = new this.fooModel(data);
    return await foo.save();
  }

  async fetchDatum(id: string): Promise<Foo> {
    return await this.fooModel.findById(id).exec();
  }

  async updateDatum(id: string, data: object): Promise<Foo> {
    return await this.fooModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteDatum(id: string): Promise<Foo> {
    return await this.fooModel.findByIdAndRemove(id).exec();
  }
}
