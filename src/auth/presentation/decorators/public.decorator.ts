import { SetMetadata, applyDecorators } from '@nestjs/common';

import { IS_PUBLIC } from '../../infra/constants/public.constant';

import { AllowFor } from './allow-for.decorator';

/**
 * Marks a route as public.
 *
 * As its result, any parameter marked with `CurrentUser` will receive a
 * guest user by default.
 */
export function Public(): MethodDecorator {
  return applyDecorators(AllowFor(/.*/), SetMetadata(IS_PUBLIC, true));
}
