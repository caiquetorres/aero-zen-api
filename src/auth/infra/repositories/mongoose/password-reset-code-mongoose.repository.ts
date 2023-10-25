import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PasswordResetCode } from '../../../domain/models/password-reset-code';

import { PasswordResetCodeRepository } from '../password-reset-code.repository';
import { PasswordResetCodeDocument } from './password-reset-code.document';

@Injectable()
export class PasswordResetCodeMongooseRepository
  implements PasswordResetCodeRepository
{
  constructor(
    @InjectModel(PasswordResetCodeDocument.name)
    private readonly _passwordResetCodeModel: Model<PasswordResetCodeDocument>,
  ) {}

  async save(
    passwordResetCode: PasswordResetCode,
  ): Promise<Result<PasswordResetCode, Error>> {
    throw new Error('Method not implemented.');
  }

  async findOneByValidCode(
    code: string,
    date?: Date | undefined,
  ): Promise<Optional<PasswordResetCode>> {
    throw new Error('Method not implemented.');
  }

  async delete(
    passwordResetCode: PasswordResetCode,
  ): Promise<Result<void, Error>> {
    throw new Error('Method not implemented.');
  }
}
