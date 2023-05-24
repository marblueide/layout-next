import { ComponentLibrary } from './component-library.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ComponentLibraryController } from './component-library.controller';
import { ComponentLibraryService } from './component-library.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentLibrary])],
  controllers: [ComponentLibraryController],
  providers: [ComponentLibraryService],
  exports: [ComponentLibraryService],
})
export class ComponentLibraryModule {}
