import { ApiProperty } from '@nestjs/swagger';

import { ICreateUser } from '../../domain/interfaces/create-user.interface';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements ICreateUser {
  /**
   * @inheritdoc
   */
  @ApiProperty({ example: 'Jane Doe' })
  @IsNotEmpty({ message: 'Name must be defined' })
  name!: string;

  /**
   * @inheritdoc
   */
  @ApiProperty({ example: 'jane.doe@aerozen.com' })
  @IsNotEmpty({ message: 'Email must be defined' })
  @IsEmail({}, { message: 'Email must be valid' })
  email!: string;

  /**
   * @inheritdoc
   */
  @ApiProperty({ example: 'janedoe' })
  @IsNotEmpty({ message: 'Username must be defined' })
  username!: string;

  /**
   * @inheritdoc
   */
  @ApiProperty({ example: 'JaneDoe#123' })
  @IsNotEmpty({ message: 'Password must be defined' })
  password!: string;
}
