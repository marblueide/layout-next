import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';
import { UserGroup } from './user-group.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGroup]),
    forwardRef(() => UserModule),
  ],
  providers: [UserGroupService],
  controllers: [UserGroupController],
  exports: [UserGroupService],
})
export class UserGroupModule {}
