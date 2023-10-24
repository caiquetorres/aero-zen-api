import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'users' })
export class UserDocument {
  _id: Types.ObjectId;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  constructor(data: {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    username: string;
    password: string;
  }) {
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
    this.email = data.email;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
  }
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
