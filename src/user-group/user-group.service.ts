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
  adminGourpId: '1';
  constructor(
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  list(paginationQueryDto: PaginationQueryDto) {
    const { offset, limit } = paginationQueryDto;
    return this.userGroupRepository.findAndCount({
      skip: offset,
      take: limit,
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

  async adminGroupInit() {
    //管理员初始化
    console.log('管理员组初始化');
    let adminGroup = await this.oneByName('管理员');
    if (!adminGroup) {
      const userGroup = this.userGroupRepository.create({
        groupName: '管理员',
        id: this.adminGourpId,
      });
      adminGroup = await this.userGroupRepository.save(userGroup);
    }
    return adminGroup;
  }
}
