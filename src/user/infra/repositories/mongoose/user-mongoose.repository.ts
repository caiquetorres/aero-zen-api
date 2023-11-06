/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from '../../../domain/entities/user';
import { IUser } from '../../../domain/interfaces/user.interface';

import { UserRepository } from '../user.repository';
import { UserMongooseMapper } from './user-mongoose.mapper';
import { UserDocument } from './user.document';

@Injectable()
export class UserMongooseRepository implements UserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly _model: Model<UserDocument>,
  ) {}

  /**
   * @inheritdoc
   */
  async save(domain: IUser): Promise<Result<User>> {
    const document = UserMongooseMapper.toDocument(domain);

    if (document.isNone()) {
      return err(new Error('Null user domain'));
    }

    const { _id } = document.value._id;

    try {
      await this._model.updateOne({ _id }, document.value, { upsert: true });
      return this._model
        .findById(_id)
        .lean()
        .then((document) => UserMongooseMapper.toDomain(document)!)
        .then((domain) => ok(domain.unwrap()));
    } catch (error: any) {
      return err(error);
    }
  }

  /**
   * @inheritdoc
   */
  async findOneByEmail(email: string): Promise<Option<User>> {
    return this._model
      .findOne({ email })
      .then((document) => UserMongooseMapper.toDomain(document));
  }

  /**
   * @inheritdoc
   */
  async findOneByUsername(username: string): Promise<Option<User>> {
    return this._model
      .findOne({ username })
      .lean()
      .then((document) => UserMongooseMapper.toDomain(document));
  }

  /**
   * @inheritdoc
   */
  async findOneById(id: string | Types.ObjectId): Promise<Option<User>> {
    return this._model
      .findById(id)
      .lean()
      .then((document) => UserMongooseMapper.toDomain(document));
  }

  /**
   * @inheritdoc
   */
  async findOneByEmailOrUsername(
    emailOrUsername: string,
  ): Promise<Option<User>> {
    return this._model
      .findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      })
      .lean()
      .then((document) => UserMongooseMapper.toDomain(document));
  }

  async deleteOne(domain: IUser): Promise<Result<void, Error>> {
    return this._model
      .deleteOne({ _id: new Types.ObjectId(domain.id.unwrap()) })
      .then(() => ok(undefined))
      .catch((error) => err(error));
  }
}
