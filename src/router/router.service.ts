/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Router } from './router.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { CreateRouterDto } from './dto/create.router.dto';
import { UpdateRouterDto } from './dto/update.router.dto';
import { UserGroupService } from 'src/user-group/user-group.service';
import { UserGroupEnum } from 'src/common/types/user';
import { routes } from './routes';
@Injectable()
export class RouterService {
  constructor(
    @InjectRepository(Router)
    private readonly routerRepository: Repository<Router>,
    @Inject(forwardRef(() => UserGroupService))
    private readonly userGroupService: UserGroupService,
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

  async list(paginationQueryDto: PaginationQueryDto) {
    try {
      const { offset, limit } = paginationQueryDto;
      const res = await this.routerRepository.findAndCount({
        skip: offset,
        take: limit,
        order: {
          createTime: 'DESC',
        },
        relations: {
          userGroup: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async delete(id: string) {
    const router = await this.one(id);
    return this.routerRepository.remove(router);
  }

  async update({ id, userGroup, ...data }: UpdateRouterDto) {
    try {
      const rest: any = { ...data };
      if (userGroup.length > 0) {
        const group = [];
        for (const id of userGroup) {
          const item = await this.userGroupService.one(id);
          group.push(item);
        }
        rest.userGroup = group;
      }
      console.log(rest);

      const router = await this.routerRepository
        .createQueryBuilder('router')
        .leftJoinAndSelect('router.userGroup', 'userGroup')
        .where('router.id = :id', { id })
        .getOne();

      if (!router) {
        throw new Error('Router not found.');
      }

      router.name = rest.name;
      router.path = rest.path;
      router.userGroup = rest.userGroup;

      const res = await this.routerRepository.save(router);
      return res;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async create(data: CreateRouterDto) {
    const rest: any = { ...data };
    if (data.userGroup.length > 0) {
      const userGourp = [];
      for (const id of data.userGroup) {
        const item = await this.userGroupService.one(id);
        userGourp.push(item);
      }
      rest.userGroup = userGourp;
      const router = this.routerRepository.create({
        ...rest,
      });
      return this.routerRepository.save(router);
    }
  }

  async routerInit() {
    const adminGroup = await this.userGroupService.oneByName(
      UserGroupEnum.admin,
    );
    const userGroup = await this.userGroupService.oneByName(
      UserGroupEnum.admin,
    );
    for (const item of routes) {
      const router = await this.routerRepository.findOne({
        where: {
          path: item.path,
        },
      });
      if (!router) {
        const res = await this.create({
          name: item.name,
          path: item.path,
          userGroup: [adminGroup.id, userGroup.id],
        });
        console.log(res);
      }
    }
    console.log('路由初始化完成');
  }
}
