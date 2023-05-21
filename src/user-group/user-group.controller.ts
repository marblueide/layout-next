import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';

@Controller('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Get('list')
  async list(@Query() paginationQuery: PaginationQueryDto) {
    const res = await this.userGroupService.list(paginationQuery);
    return {
      message: '查询成功',
      data: res[0],
      count: res[1],
    };
  }

  @Post('create')
  async create(@Body() data: CreateUserGroupDto) {
    const res = await this.userGroupService.create(data);
    return {
      message: '创建成功',
      data: res,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.delete(id);
    return {
      message: '删除成功',
    };
  }

  @Post('update')
  async update(@Body() data: UpdateUserGroupDto) {
    await this.userGroupService.update(data);
    return {
      message: '更新成功',
    };
  }
}
