/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RouterService } from './router.service';
import { AuthGuard } from '@nestjs/passport';
import { Paginated } from 'src/common/dto/Paginated.model';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { CreateRouterDto } from './dto/create.router.dto';
import { UpdateRouterDto } from './dto/update.router.dto';

@Controller('router')
export class RouterController {
  constructor(private readonly routerService: RouterService) {
    this.routerService.routerInit();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async list(@Query() paginationQuery: PaginationQueryDto) {
    const res = await this.routerService.list(paginationQuery);
    return {
      message: '查询成功',
      data: res[0],
      count: res[1],
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() data: CreateRouterDto) {
    const res = await this.routerService.create(data);
    return {
      message: '创建成功',
      data: res,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Query('id') id: string) {
    console.log(id);
    await this.routerService.delete(id);
    return {
      message: '删除成功',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async update(@Body() data: UpdateRouterDto) {
    await this.routerService.update(data);
    return {
      message: '更新成功',
    };
  }
}
