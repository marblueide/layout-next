/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Paginated } from 'src/common/dto/Paginated.model';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService.adminInit();
  }

  @Get('list')
  async list(@Query() paginationQuery: PaginationQueryDto) {
    const res = await this.userService.list(paginationQuery);
    return {
      message: '查询成功',
      data: res[0],
      count: res[1],
    };
  }

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    const res = await this.userService.create(data);
    return {
      message: '创建成功',
      data: res,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return {
      message: '删除成功',
    };
  }

  @Post('update')
  async update(@Body() data: UpdateUserDto) {
    await this.userService.update(data);
    return {
      message: '更新成功',
    };
  }
}
