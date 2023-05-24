import { UpdateComponentDto } from './dto/update-component.dto';
import { CreateComponentDto } from './dto/create-component.dto';
import { ComponentService } from './component.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Get('one/:id')
  async findOne(@Param('id') id: string) {
    const res = await this.componentService.one(id);
    return {
      data: res,
      message: '查询成功',
    };
  }

  @Get('list')
  public async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const [component, count] = await this.componentService.list(
      paginationQuery,
    );
    return {
      data: {
        list: component,
        total: count,
      },
      order: {
        createTime: 'DESC',
      },
      message: '获取成功',
    };
  }

  @Get('listByLibId')
  public async findAllByLibId(@Query('id') id: string) {
    const [componentList] = await this.componentService.listByLibId(id);
    return {
      data: componentList,
      message: '获取成功',
    };
  }

  @Post('create')
  public async create(@Body() component: CreateComponentDto) {
    const res = await this.componentService.create(component);
    return {
      data: res,
      message: '创建成功',
    };
  }

  @Post('update')
  public async update(@Body() componentLib: UpdateComponentDto) {
    const res = await this.componentService.update(componentLib);
    return {
      data: res,
      message: '更新成功',
    };
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    await this.componentService.delete(id);
    return {
      message: '删除成功',
    };
  }
}
