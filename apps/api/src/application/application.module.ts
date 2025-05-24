import { Module } from '@nestjs/common';
import { ApplicationController } from './controllers/application.controller';
import { DatabaseModule } from '../database/database.module';
import { ApplicationService } from './services/application.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
