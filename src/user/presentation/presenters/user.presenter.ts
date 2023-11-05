import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../domain/entities/role';
import { IUser } from '../../domain/interfaces/user.interface';

import { randomUUID } from 'crypto';

export class UserPresenter {
  @ApiProperty({ example: randomUUID() })
  readonly id: string;

  @ApiProperty({ example: new Date() })
  readonly createdAt: Date;

  @ApiProperty({ example: new Date() })
  readonly updatedAt: Date;

  @ApiProperty({ example: 'Jane Doe' })
  readonly name: string;

  @ApiProperty({ example: 'jane.doe@aerozen.com' })
  readonly email: string;

  @ApiProperty({ example: 'janedoe' })
  readonly username: string;

  @ApiProperty({ example: [Role.user] })
  readonly permissions: Role[];

  constructor(user: IUser) {
    this.id = user.id.unwrap();
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.permissions = [...user.roles];

    Object.freeze(this);
  }
}
