import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { Component } from './component.entity';
import { ComponentLibraryModule } from 'src/component-library/component-library.module';

@Module({
  imports: [TypeOrmModule.forFeature([Component]), ComponentLibraryModule],
  controllers: [ComponentController],
  providers: [ComponentService],
  exports: [ComponentService]
})
export class ComponentModule {}
