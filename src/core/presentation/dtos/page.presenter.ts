import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IPage } from '../../domain/interfaces/page.interface';

/**
 * Creates a page class with the specified type for `data`.
 *
 * @param type  type The constructor function for the type of data
 * contained in the page.
 * @returns A class that implements the page class.
 */
export function PagePresenter<T>(type: Type<T>) {
  class P implements IPage<T> {
    /**
     * @inheritdoc
     */
    @ApiProperty({ example: true })
    readonly hasNextPage: boolean;

    /**
     * @inheritdoc
     */
    @ApiProperty({ example: 1 })
    readonly page: number;

    /**
     * @inheritdoc
     */
    @ApiProperty({ example: 10 })
    readonly limit: number;

    /**
     * @inheritdoc
     */
    @ApiProperty({ type, isArray: true })
    readonly data: T[];

    constructor(page: IPage<unknown>) {
      this.hasNextPage = page.hasNextPage;
      this.page = page.page;
      this.limit = page.limit;
      this.data = page.data.map((item) => new type(item));
    }
  }
  return P;
}
