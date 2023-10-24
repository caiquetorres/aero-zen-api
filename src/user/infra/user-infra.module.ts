import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserMongooseRepository } from './repositories/mongoose/user-mongoose.repository';
import {
  UserDocument,
  UserSchema,
} from './repositories/mongoose/user.document';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserMongooseRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserInfraModule {}
