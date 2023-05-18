import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Module({})
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.configService.get('DATABASE_HOST'),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PWD'),
      database: this.configService.get('DATABASE_NAME'),
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
