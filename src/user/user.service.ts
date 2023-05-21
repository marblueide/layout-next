/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UserGroupService } from 'src/user-group/user-group.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => UserGroupService))
    private readonly userGroupService: UserGroupService,
  ) {}

  one(id: string) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  oneByUserName(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  list(paginationQueryDto: PaginationQueryDto) {
    const { offset, limit } = paginationQueryDto;
    return this.userRepository.findAndCount({
      skip: offset,
      take: limit,
      order: {
        createTime: 'DESC',
      },
    });
  }

  create(data: CreateUserDto) {
    const rest: any = { ...data };
    if (data.userGroup) {
      const userGroup = this.userGroupService.one(data.userGroup);
      rest.userGourp = userGroup;
    }
    const user = this.userRepository.create({
      ...rest,
    });
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.one(id);
    return this.userRepository.remove(user);
  }

  async update(data: UpdateUserDto) {
    const rest: any = { ...data };
    if (data.userGroup) {
      const userGroup = await this.userGroupService.one(data.userGroup);
      rest.userGourp = userGroup;
    }
    return this.userRepository.update(data.id, rest);
  }

  async adminInit() {
    const userGroup = await this.userGroupService.adminGroupInit();
    let admin = await this.oneByUserName('admin');
    if (!admin) {
      const user = this.userRepository.create({
        userGroup: userGroup,
        username: 'admin',
        password: '123456',
      });
      admin = await this.userRepository.save(user);
    }
    return admin;
  }
}
