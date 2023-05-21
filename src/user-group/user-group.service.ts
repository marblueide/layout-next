import { Injectable } from '@nestjs/common';
import { UserGroup } from './user-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,
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
}
