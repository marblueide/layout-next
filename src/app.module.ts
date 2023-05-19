import { PageModule } from './page/page.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './typeormconfig.module';
import { UserModule } from './user/user.module';
import { ComponentLibraryModule } from './component-library/component-library.module';
import { ComponentModule } from './component/component.module';
import { UserGroupModule } from './user-group/user-group.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/Interceptor/Transform.Interceptor';

@Module({
  imports: [
    PageModule,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
