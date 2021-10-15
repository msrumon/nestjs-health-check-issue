import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FooDocument = Foo & Document;

@Schema()
export class Foo {
  @Prop()
  bar: string;
}

export const FooSchema = SchemaFactory.createForClass(Foo);
