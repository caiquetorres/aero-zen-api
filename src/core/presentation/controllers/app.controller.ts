import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../../auth/presentation/decorators/public.decorator';

@ApiTags()
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Test the api connection' })
  @ApiOkResponse({ type: String })
  @Public()
  @Get('ping')
  ping(): string {
    return 'pong';
  }
}
