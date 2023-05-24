import { UpdateComponentLibraryDto } from './dto/update-componet-library.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { Component } from 'src/component/component.entity';
import { Repository } from 'typeorm';
import { ComponentLibrary } from './component-library.entity';
import { CreateComponentLibraryDto } from './dto/create-component-library.dto';

@Injectable()
export class ComponentLibraryService {
  constructor(
    @InjectRepository(ComponentLibrary)
    private readonly componentLibraryRepository: Repository<ComponentLibrary>,
  ) {}

  one(id: string) {
    return this.componentLibraryRepository.findOne({
      where: {
        id,
      },
    });
  }

  list(pagination: PaginationQueryDto) {
    const { limit, offset } = pagination;
    return this.componentLibraryRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: ['components'],
    });
  }

  create(componentLibrary: CreateComponentLibraryDto) {
    const entity = this.componentLibraryRepository.create({
      ...componentLibrary,
    });

    return this.componentLibraryRepository.save(entity);
  }

  update(componentLibrary: UpdateComponentLibraryDto) {
    return this.componentLibraryRepository.update(
      componentLibrary.id,
      componentLibrary,
    );
  } 

  async delete(id: string) {
    const component = await this.one(id);
    return this.componentLibraryRepository.remove(component);
  }
}
