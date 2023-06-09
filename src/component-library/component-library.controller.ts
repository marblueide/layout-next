import {
  Controller,
  Param,
  Get,
  Query,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { ComponentLibraryService } from './component-library.service';
import { CreateComponentLibraryDto } from './dto/create-component-library.dto';
import { UpdateComponentLibraryDto } from './dto/update-componet-library.dto';

@Controller('componentLibrary')
export class ComponentLibraryController {
  constructor(
    private readonly componentLibraryService: ComponentLibraryService,
  ) {}

  @Get('one/:id')
  public async findOne(@Param('id') id: string) {
    const res = await this.componentLibraryService.one(id);
    return {
      data: res,
      message: '查询成功',
    };
  }

  @Get('list')
  public async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const [componentLibrary, count] = await this.componentLibraryService.list(
      paginationQuery,
    ); 
    return { 
      data: {
        list: componentLibrary,
        total: count,
      },
      order: {
        createTime: 'DESC',
      },
      message: '获取成功',
    };
  }

  @Post('create')
  public async create(@Body() component: CreateComponentLibraryDto) {
    const res = await this.componentLibraryService.create(component);
    return {
      data: res,
      message: '创建成功',
    };
  }

  @Post('update')
  public async update(@Body() componentLib: UpdateComponentLibraryDto) {
    const res = await this.componentLibraryService.update(componentLib);
    return {
      data: res,
      message: '更新成功',
    };
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    await this.componentLibraryService.delete(id);
    return {
      message: '删除成功',
    };
  }
}
