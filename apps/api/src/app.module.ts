import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { loadConfig } from './config/configuration';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ load: [loadConfig] }),
    DatabaseModule,
    SystemModule,
  ]
})
export class AppModule {}
