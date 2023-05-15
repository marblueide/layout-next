import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './typeormconfig.module';
import { UserModule } from './user/user.module';
import { ComponentLibraryModule } from './component-library/component-library.module';
import { ComponentModule } from './component/component.module';
import { PageLibraryModule } from './page-library/page-library.module';
import { UserGroupModule } from './user-group/user-group.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserGroupModule,
    ComponentLibraryModule,
    ComponentModule,
    PageLibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
