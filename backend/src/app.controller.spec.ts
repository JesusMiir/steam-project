// src/app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  const svc = {
    // ⚠️ match whatever your real AppService returns
    getHello: jest.fn().mockReturnValue('Hello World!'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: svc }],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET / -> returns hello from service', () => {
    const out = controller.getHello();
    expect(svc.getHello).toHaveBeenCalledTimes(1);
    expect(out).toBe('Hello World!'); // change to 'Hello World!!' if your real service returns that
  });
});
