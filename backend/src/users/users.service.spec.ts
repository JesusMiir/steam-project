import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";

describe("UsersService", () => {
  let service: UsersService;

  // Minimal Prisma mock for methods this service uses
  const prisma = {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("findAll() -> returns users", async () => {
    const rows = [
      { id: 1, email: "a@x.com", name: "A" },
      { id: 2, email: "b@x.com", name: "B" },
    ];
    (prisma.user.findMany as any).mockResolvedValue(rows);

    const out = await service.findAll();

    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(out).toEqual(rows);
  });

  it("create(dto) -> forwards dto to prisma and returns created user", async () => {
    const dto = { email: "new@x.com", name: "New User" };
    const created = { id: 10, ...dto };
    (prisma.user.create as any).mockResolvedValue(created);

    const out = await service.create(dto as any);

    expect(prisma.user.create).toHaveBeenCalledWith({ data: dto });
    expect(out).toEqual(created);
  });

  it("create(dto) -> propagates prisma errors", async () => {
    const dto = { email: "dup@x.com", name: "Dup" };
    (prisma.user.create as any).mockRejectedValue(
      new Error("Unique constraint failed")
    );

    await expect(service.create(dto as any)).rejects.toThrow(
      "Unique constraint failed"
    );
  });
});
