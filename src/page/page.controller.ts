/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PageService } from './page.service';
import { Paginated } from 'src/common/dto/Paginated.model';
import { CreatePageDto } from './dto/page.create.input';
import { PageUpdateDto } from './dto/page.update.input';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  public async list(@Query('input') input: string) {
    const res = await this.pageService.list(input);
    return new Paginated(res[0], res[1]);
  }

  @Post('create')
  public async create(@Body() createPageDto: CreatePageDto) {
    const res = await this.pageService.create(createPageDto);
    return {
      data: res,
      message: '创建成功',
    };
  }

  @Post('update')
  public async update(@Body() updatePageDto: PageUpdateDto) {
    const res = await this.pageService.update(updatePageDto);
    return {
      message: '修改成功',
    };
  }

  @Delete('delete')
  public async delete(@Query('id') id: string) {
    const res = await this.pageService.delete(id);
    return {
      data: res,
      message: '删除成功',
    };
  }

  @Get('one')
  public async one(@Query('id') id: string) {
    console.log(id);
    const res = await this.pageService.one(id);
    return {
      data: res,
      message: '查询成功',
    };
  }
}
