import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { loadConfig } from './config/configuration';
import { RawBodyMiddleware } from "./common/middlewares/raw-body";
import { SystemModule } from './system/system.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ApplicationModule,
    AuthModule,
    ConfigModule.forRoot({ load: [loadConfig] }),
    DatabaseModule,
    StorageModule,
    SystemModule,
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes("*");
  }
}
