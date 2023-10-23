import { ApiPropertyOptional } from '@nestjs/swagger';

import { IPageQuery } from '../../domain/interfaces/page-query.interface';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

/**
 * A class representing pagination query parameters.
 */
export class PageQuery implements IPageQuery {
  /**
   * @inheritdoc
   */
  @ApiPropertyOptional({ example: 1, default: 1 })
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'Page must not be less than 1' })
  @IsInt({ message: 'Page must be an integer number' })
  page = 1;

  /**
   * @inheritdoc
   */
  @ApiPropertyOptional({ example: 10, default: 10 })
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'Limit must not be less than 1' })
  @Max(100, { message: 'Limit must not greater than 100' })
  @IsInt({ message: 'Limit must be an integer number' })
  limit = 10;
}
