import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../../src/app.module';

export class AppContext {
  app: INestApplication;

  async build(): Promise<AppContext> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    this.app = app;
    return this;
  }

  async close(): Promise<void> {
    await this.app.close();
  }
}
