import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserGroup } from './user-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  list() {
    return this.userGroupRepository.findAndCount({
      order: {
        createTime: 'DESC',
      },
    });
  }

  create(data: CreateUserGroupDto) {
    const userGroup = this.userGroupRepository.create({
      ...data,
    });
    return this.userGroupRepository.save(userGroup);
  }

  update(data: UpdateUserGroupDto) {
    return this.userGroupRepository.update(data.id, data);
  }

  async delete(id: string) {
    const userGroup = await this.one(id);
    return this.userGroupRepository.remove(userGroup);
  }

  one(id: string) {
    return this.userGroupRepository.findOne({
      where: {
        id,
      },
    });
  }

  oneByName(groupName: string) {
    return this.userGroupRepository.findOne({
      where: {
        groupName,
      },
    });
  }

  async groupInit(name: string) {
    let group = await this.oneByName(name);
    if (!group) {
      const userGroup = this.userGroupRepository.create({
        groupName: name,
      });
      group = await this.userGroupRepository.save(userGroup);
    }
    return group;
  }
}
