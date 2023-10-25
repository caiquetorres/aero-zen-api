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
    const result = UserMongooseMapper.toDocument(domain);

    if (result.isNone()) {
      return err(new Error('Null user domain'));
    }

    const document = result.value;
    const { _id } = document._id;

    await this._model.updateOne({ _id }, document, { upsert: true });
    return this._model
      .findById(_id)
      .lean()
      .then((document) => UserMongooseMapper.toDomain(document)!)
      .then((domain) => ok(domain.unwrap()));
  }

  /**
   * @inheritdoc
   */
  async findOneByEmail(email: string): Promise<Optional<User>> {
    return this._model
      .findOne({ email })
      .then((document) => UserMongooseMapper.toDomain(document));
  }

  /**
   * @inheritdoc
   */
  async findOneByUsername(username: string): Promise<Optional<User>> {
    return this._model
      .findOne({ username })
      .lean()
      .then((document) => UserMongooseMapper.toDomain(document));
  }

  /**
   * @inheritdoc
   */
  async findOneById(id: string | Types.ObjectId): Promise<Optional<User>> {
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
  ): Promise<Optional<User>> {
    return this._model
      .findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      })
      .lean()
      .then((document) => UserMongooseMapper.toDomain(document));
  }
}
