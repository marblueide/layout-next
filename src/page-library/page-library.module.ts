import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PageLibraryController } from './page-library.controller';
import { PageLibraryService } from './page-library.service';
import { PageLibrary } from './page-library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PageLibrary])],
  controllers: [PageLibraryController],
  providers: [PageLibraryService],
})
export class PageLibraryModule {}
