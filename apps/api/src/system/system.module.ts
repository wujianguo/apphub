import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { SystemController } from './system.controller';

@Module({
  imports: [TerminusModule],
  controllers: [SystemController],
})
export class SystemModule {}
