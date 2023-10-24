/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { User } from '../../../domain/entities/user';
import { IUser } from '../../../domain/interfaces/user.interface';

import { UserRepository } from '../user.repository';
import { UserMongooseMapper } from './user-mongoose.mapper';
import { UserDocument } from './user.document';

@Injectable()
export class UserMongooseRepository implements UserRepository {
  private readonly _logger = new Logger(UserMongooseRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    private readonly _model: Model<UserDocument>,
    @InjectConnection()
    private readonly _connection: Connection,
  ) {}

  /**
   * @inheritdoc
   */
  async save(domain: IUser): Promise<Result<User>> {
    if (!domain) {
      return err(new Error('Null user domain'));
    }

    try {
      // Update
      if (domain.id.isSome()) {
        const document = UserMongooseMapper.toDocument(domain);
        const { _id } = document._id;

        await this._model.updateOne({ _id }, document);
        return this._model
          .findById(_id)
          .then((document) => UserMongooseMapper.toDomain(document)!)
          .then((domain) => ok(domain));
      }

      const document = UserMongooseMapper.toDocument(domain);

      // Save
      return new this._model(document)
        .save()
        .then((document) => UserMongooseMapper.toDomain(document)!)
        .then((domain) => ok(domain));
    } catch (error: any) {
      this._logger.error(error);
      console.error(error);
      return err(new Error('Error while saving user'));
    }
  }

  /**
   * @inheritdoc
   */
  async findOneByEmail(email: string): Promise<Optional<User>> {
    // REVIEW: Should we verify if the email is valid?
    return this._model.findOne({ email }).then((document) => {
      const domain = UserMongooseMapper.toDomain(document);
      return domain ? some(domain) : none();
    });
  }

  /**
   * @inheritdoc
   */
  async findOneByUsername(username: string): Promise<Optional<User>> {
    // REVIEW: Should we verify if the username is valid?
    return this._model.findOne({ username }).then((document) => {
      const domain = UserMongooseMapper.toDomain(document);
      return domain ? some(domain) : none();
    });
  }
}
