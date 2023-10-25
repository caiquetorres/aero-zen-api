import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { User } from '../../../domain/entities/user';
import { IUser } from '../../../domain/interfaces/user.interface';
import { Password } from '../../../domain/value-objects/password';

import { UserDocument } from './user.document';

@Injectable()
export class UserMongooseMapper {
  static toDomain(doc: UserDocument): User;

  static toDomain(doc: UserDocument | null): User | null;

  static toDomain(doc: UserDocument | null): User | null {
    if (!doc) {
      return null;
    }

    return new User({
      id: doc._id.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      name: doc.name,
      email: doc.email,
      username: doc.username,
      password: new Password(doc.password),
      roles: doc.roles,
    });
  }

  static toDocument(domain: IUser): UserDocument;

  static toDocument(domain: IUser | null): UserDocument | null;

  static toDocument(domain: IUser | null): UserDocument | null {
    if (!domain) {
      return null;
    }

    const id = domain.id.isSome()
      ? new Types.ObjectId(domain.id.unwrap())
      : new Types.ObjectId();

    return new UserDocument({
      _id: id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      name: domain.name,
      email: domain.email,
      username: domain.username,
      password: domain.password.value,
      roles: domain.roles,
    });
  }
}
