/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Router } from './router.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { CreateRouterDto } from './dto/create.router.dto';
import { UpdateRouterDto } from './dto/update.router.dto';

@Injectable()
export class RouterService {
  constructor(
    @InjectRepository(Router)
    private readonly routerRepository: Repository<Router>,
  ) {}

  one(id: string) {
    return this.routerRepository.findOne({
      where: {
        id,
      },
    });
  }

  oneByName(name: string) {
    return this.routerRepository.findOne({
      where: {
        name,
      },
      relations: [],
    });
  }

  list(paginationQueryDto: PaginationQueryDto) {
    const { offset, limit } = paginationQueryDto;
    return this.routerRepository.findAndCount({
      skip: offset,
      take: limit,
      order: {
        createTime: 'DESC',
      },
      relations: [],
    });
  }

  async delete(id: string) {
    const router = await this.one(id);
    return this.routerRepository.remove(router);
  }

  async update({ id, ...data }: UpdateRouterDto) {
    const rest: any = { ...data };
    if (data.userGroup.length > 0) {
      const userGroup = [];
      for (const id of data.userGroup) {
        const item = await this.one(id);
        userGroup.push(item);
      }
      rest.userGourp = userGroup;
    }
    return this.routerRepository.update(id, {
      ...rest,
    });
  }

  async create({}: CreateRouterDto) {}
}
