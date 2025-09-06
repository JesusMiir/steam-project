import { Test, TestingModule } from "@nestjs/testing";
import { GamesService } from "./games.service";
import { PrismaService } from "src/prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

describe("GamesService", () => {
  let service: GamesService;

  // Minimal Prisma mock for the methods this service uses
  const prisma = {
    game: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<GamesService>(GamesService);
    jest.clearAllMocks();
  });

  it("findAll() returns games", async () => {
    const mock = [
      {
        id: 1,
        title: "Half-Life",
        price: 29.99,
        genre: "fps",
        description: "Classic",
      },
    ];
    (prisma.game.findMany as any).mockResolvedValue(mock);

    await expect(service.findAll()).resolves.toEqual(mock);
    expect(prisma.game.findMany).toHaveBeenCalledTimes(1);
  });

  it("findOne(id) returns a game", async () => {
    const mock = {
      id: 7,
      title: "Celeste",
      price: 19.99,
      genre: "platformer",
      description: "GOAT",
    };
    (prisma.game.findUnique as any).mockResolvedValue(mock);

    const out = await service.findOne(7);

    expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: 7 } });
    expect(out).toEqual(mock);
  });

  it("findOne(id) returns null when not found", async () => {
    (prisma.game.findUnique as any).mockResolvedValue(null);

    const out = await service.findOne(999);

    expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
    expect(out).toBeNull();
  });

  it("create(dto) forwards dto to prisma", async () => {
    const dto = {
      title: "New",
      description: "desc",
      price: 9.99,
      genre: "Indie",
    };
    const created = { id: 10, ...dto };
    (prisma.game.create as any).mockResolvedValue(created);

    const out = await service.create(dto as any);

    expect(prisma.game.create).toHaveBeenCalledWith({ data: dto });
    expect(out).toEqual(created);
  });

  it("update(id, dto) updates a game", async () => {
    const dto = { title: "Updated" };
    const updated = {
      id: 5,
      title: "Updated",
      description: "desc",
      price: 9.99,
      genre: "Indie",
    };
    (prisma.game.update as any).mockResolvedValue(updated);

    const out = await service.update(5, dto as any);

    expect(prisma.game.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: dto,
    });
    expect(out).toEqual(updated);
  });

  it("remove(id) deletes an existing game", async () => {
    (prisma.game.findUnique as any).mockResolvedValue({ id: 5 });
    (prisma.game.delete as any).mockResolvedValue({ id: 5 });

    const out = await service.remove(5);

    expect(prisma.game.findUnique).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(prisma.game.delete).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(out).toEqual({ id: 5 });
  });

  it("remove(id) throws NotFoundException if game missing", async () => {
    (prisma.game.findUnique as any).mockResolvedValue(null);

    await expect(service.remove(404)).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.game.delete).not.toHaveBeenCalled();
  });
});
