import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { UserDocument } from '../../../../user/infra/repositories/mongoose/user.document';

@Schema({ collection: 'passwordresetcodes' })
export class PasswordResetCodeDocument {
  _id: Types.ObjectId;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;

  @Prop({ required: true, index: 'text' })
  code: string;

  @Prop({ required: true })
  expirationDate: Date;

  @Prop({
    type: Types.ObjectId,
    ref: UserDocument.name,
    required: true,
  })
  owner: Types.ObjectId | UserDocument;

  constructor(data: {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    expirationDate: Date;
    owner: Types.ObjectId | UserDocument;
  }) {
    this._id = data._id;
    this.code = data.code;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.expirationDate = data.expirationDate;
    this.owner = data.owner;
  }
}

export const PasswordResetCodeSchema = SchemaFactory.createForClass(
  PasswordResetCodeDocument,
);
