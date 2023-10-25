import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ThrowResultErrPipe
  implements PipeTransform<Result<unknown>, Result<unknown>>
{
  transform(result: Result<unknown>): Result<unknown> {
    if (result.isErr()) {
      throw result.error;
    }
    return result;
  }
}
