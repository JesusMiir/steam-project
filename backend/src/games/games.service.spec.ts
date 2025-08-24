import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { GamesService } from "./games.service";
import { PrismaService } from "src/prisma/prisma.service";

describe("GamesService", () => {
  let service: GamesService;

  // Mock mínimo de Prisma
  const prismaMock = {
    game: {
      findMany: jest
        .fn()
        .mockResolvedValue([
          {
            id: 1,
            title: "Half-Life",
            price: 29.99,
            genre: "fps",
            description: "Classic",
          },
        ]),
      findUnique: jest.fn(),
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: PrismaService, useValue: prismaMock }, // 👈 inyectamos el mock
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  afterEach(() => jest.clearAllMocks());

  it("findAll() devuelve la lista de juegos", async () => {
    const res = await service.findAll();
    expect(res).toHaveLength(1);
    expect(prismaMock.game.findMany).toHaveBeenCalledTimes(1);
  });

  it("findOne() devuelve el juego cuando existe", async () => {
    prismaMock.game.findUnique.mockResolvedValueOnce({
      id: 7,
      title: "Portal",
      price: 19.99,
      genre: "puzzle",
      description: "GOTY",
    });
    const res = await service.findOne(7);
    expect(res?.id).toBe(7);
    expect(prismaMock.game.findUnique).toHaveBeenCalledWith({
      where: { id: 7 },
    });
  });

  it("findOne() lanza NotFoundException cuando no existe", async () => {
    prismaMock.game.findUnique.mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
