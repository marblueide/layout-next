/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { Like, Repository } from 'typeorm';
import { PageUpdateDto } from './dto/page.update.input';
import { UserService } from 'src/user/user.service';
import { CreatePageDto } from './dto/page.create.input';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
    private readonly userService: UserService,
  ) {}

  list(input: string) {
    return this.pageRepository.findAndCount({
      order: {
        updateTime: 'DESC',
      },
      relations: ['user'],
      where: {
        pageName: Like(`%${input}%`),
      },
    });
  }

  one(id: string) {
    return this.pageRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const page = await this.one(id);
    return this.pageRepository.remove(page);
  }

  async create(data: CreatePageDto) {
    const user = await this.userService.one(data.user);
    const page = this.pageRepository.create({
      ...data,
      user: user,
    });
    return this.pageRepository.save(page);
  }

  async update(data: PageUpdateDto) {
    const rest: any = { ...data };
    if (data.user) {
      const user = await this.userService.one(data.user);
      rest.user = user;
    }
    return this.pageRepository.update(data.id, rest);
  }
}
