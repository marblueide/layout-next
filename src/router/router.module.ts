import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterController } from './router.controller';
import { RouterService } from './router.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Router } from './router.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Router])],
  controllers: [RouterController],
  providers: [RouterService],
  exports: [RouterService],
})
export class RouterModule {}
