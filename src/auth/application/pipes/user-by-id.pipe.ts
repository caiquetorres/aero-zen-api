import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

import { IUser } from '../../../user/domain/interfaces/user.interface';

import { UserRepository } from '../../../user/infra/repositories/user.repository';

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<IUser>> {
  constructor(private readonly _repository: UserRepository) {}

  async transform(id: string): Promise<IUser> {
    const user = await this._repository.findOneById(id);

    if (user.isNone()) {
      throw new NotFoundException(`User identified by '${id}' does not exist`);
    }

    return user.value;
  }
}
