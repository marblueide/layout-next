/*
https://docs.nestjs.com/providers#services
*/

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UserGroupService } from 'src/user-group/user-group.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserGroupEnum } from 'src/common/types/user';
import * as md5 from "md5"

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
      relations: ['userGroup'],
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
      relations: ['userGroup'],
    });
  }

  async create(data: CreateUserDto) {
    const rest: any = { ...data };
    // if (data.userGroup) {
    //   const userGroup = this.userGroupService.one(data.userGroup);
    //   rest.userGourp = userGroup;
    // }
    const userGourp = this.userGroupService.oneByName(UserGroupEnum.user);
    rest.userGourp = userGourp;

    const userExsited = await this.oneByUserName(data.username);
    if (userExsited) {
      throw new HttpException('用户已存在', HttpStatus.INTERNAL_SERVER_ERROR);
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
    const adminGroup = await this.userGroupService.groupInit(
      UserGroupEnum.admin,
    );
    const userGroup = await this.userGroupService.groupInit(UserGroupEnum.user);
    const password = md5('123456');
    let admin = await this.oneByUserName('admin');
    if (!admin) {
      const user = this.userRepository.create({
        userGroup: adminGroup,
        username: 'admin',
        password,
      });
      admin = await this.userRepository.save(user);
    }
    return admin;
  }
}
