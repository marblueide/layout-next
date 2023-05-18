/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { PageService } from './page.service';
import { Paginated } from 'src/common/dto/Paginated.model';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @Get('list')
  public async list(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ) {
    const res = await this.pageService.list(offset, limit);
    return new Paginated(res[0], res[1]);
  }
}
