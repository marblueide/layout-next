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

@Controller('componentLibrary')
export class ComponentLibraryController {
  constructor(
    private readonly componentLibraryService: ComponentLibraryService,
  ) {}

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.componentLibraryService.one(id);
  }

  @Get('list')
  public async findAll(@Query() paginationQuery: PaginationQueryDto) {
    console.log(11111)
    const res = await this.componentLibraryService.list(paginationQuery)
    return {
      data: res,
      message: '获取成功',
    };
  }

  @Post()
  public create(@Body() component: CreateComponentLibraryDto) {
    return this.componentLibraryService.create(component);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.componentLibraryService.delete(id);
  }
}
