import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const svc = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: svc }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /users -> returns list from service', async () => {
    const mockUsers = [
      { id: 1, email: 'a@x.com', name: 'A' },
      { id: 2, email: 'b@x.com', name: 'B' },
    ];
    svc.findAll.mockResolvedValue(mockUsers);

    const out = await controller.findAll();

    expect(svc.findAll).toHaveBeenCalledTimes(1);
    expect(out).toEqual(mockUsers);
  });

  it('POST /users -> creates a user via service', async () => {
    const dto = { email: 'new@x.com', name: 'New User' };
    const created = { id: 10, ...dto };
    svc.create.mockResolvedValue(created);

    const out = await controller.create(dto as any);

    expect(svc.create).toHaveBeenCalledWith(dto);
    expect(out).toEqual(created);
  });

  it('POST /users -> propagates service errors', async () => {
    const dto = { email: 'dup@x.com', name: 'Dup' };
    svc.create.mockRejectedValue(new Error('Email already exists'));

    await expect(controller.create(dto as any)).rejects.toThrow('Email already exists');
    expect(svc.create).toHaveBeenCalledWith(dto);
  });
});
