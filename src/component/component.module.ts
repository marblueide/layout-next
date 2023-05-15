import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { Component } from './component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
