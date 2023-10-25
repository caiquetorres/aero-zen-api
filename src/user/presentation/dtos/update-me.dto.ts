import { ApiProperty } from '@nestjs/swagger';

import { IUpdateMe } from '../../domain/interfaces/update-me.interface';

import { IsNotEmpty } from 'class-validator';

export class UpdateMeDto implements IUpdateMe {
  /**
   * @inheritdoc
   */
  @ApiProperty({ example: 'Jane Doe' })
  @IsNotEmpty({ message: 'Name must be defined' })
  name!: string;
}
