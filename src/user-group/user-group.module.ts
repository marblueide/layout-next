import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';
import { UserGroup } from './user-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGroup])],
  providers: [UserGroupService],
  controllers: [UserGroupController],
  exports: [UserGroupService],
})
export class UserGroupModule {}
