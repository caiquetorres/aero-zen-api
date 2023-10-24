import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { EnvService } from '../../../../env/infra/services/env.service';

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(private readonly _envService: EnvService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this._envService.get('DB_URL'),
    };
  }
}
