import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StorageService } from './services/storage.service';

@Module({
  imports: [DatabaseModule],
  // controllers: [ApplicationController],
  providers: [StorageService],
})
export class StorageModule {}
