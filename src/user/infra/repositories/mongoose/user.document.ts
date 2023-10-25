import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Role } from '../../../domain/entities/role';

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

  @Prop({ required: true, type: [String] })
  roles: Role[];

  constructor(data: {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    username: string;
    password: string;
    roles: Iterable<Role>;
  }) {
    this._id = data._id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
    this.email = data.email;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.roles = [...data.roles];
  }
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
UserSchema.index({ email: 1, username: 1 });
