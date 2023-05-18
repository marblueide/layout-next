import { PageController } from './page.controller';
import { PageService } from './page.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), UserModule],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
