import { UpdateComponentDto } from './dto/update-component.dto';
import { CreateComponentDto } from './dto/create-component.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/PaginationQuery.dto';
import { Repository } from 'typeorm';
import { Component } from './component.entity';
import { ComponentLibraryService } from 'src/component-library/component-library.service';
import { async } from 'rxjs';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
    @Inject(ComponentLibraryService)
    private readonly componentLibraryService: ComponentLibraryService,
  ) {}

  one(id: string) {
    return this.componentRepository.findOne({
      where: {
        id,
      },
    });
  }

  list(pagination: PaginationQueryDto) {
    const { limit, offset } = pagination;
    return this.componentRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  async create(component: CreateComponentDto) {
    const rest: any = { ...component };
    if (component.libId) {
      const componentLib = await this.componentLibraryService.one(
        component.libId,
      );
      rest.libId = componentLib;
    }
    const entity = this.componentRepository.create({
      ...rest,
    });

    return this.componentRepository.save(entity);
  }

  async update(component: UpdateComponentDto) {
    const rest: any = { ...component };
    if (rest.libId) {
      const lib = await this.componentLibraryService.one(rest.libId);
      rest.libId = lib;
    }

    return this.componentRepository.update(component.id, rest);
  }

  async delete(id: string) {
    const component = await this.one(id);
    return this.componentRepository.remove(component);
  }

  async listByLibId(id: string) {
    return this.componentRepository.findAndCount({
      where: {
        libId: {
          id,
        },
      },
    });
  }
}
