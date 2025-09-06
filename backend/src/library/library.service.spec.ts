import { Test, TestingModule } from "@nestjs/testing";
import { LibraryService } from "./library.service";
import { PrismaService } from "src/prisma/prisma.service";

describe("LibraryService", () => {
  let service: LibraryService;

  // Minimal Prisma mock for what LibraryService uses
  const prisma = {
    library: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<LibraryService>(LibraryService);
  });

  it("addGame -> creates a library entry", async () => {
    const dto = { userId: 7, gameId: 3 };
    const created = { id: 42, userId: 7, gameId: 3 };

    (prisma.library.create as any).mockResolvedValue(created);

    const out = await service.addGame(dto as any);

    expect(prisma.library.create).toHaveBeenCalledWith({
      data: { userId: 7, gameId: 3 },
    });
    expect(out).toEqual(created);
  });

  it("findUserLibrary -> returns items with game details", async () => {
    const rows = [
      { id: 1, userId: 7, gameId: 2, game: { id: 2, title: "Hades" } },
      { id: 2, userId: 7, gameId: 5, game: { id: 5, title: "Celeste" } },
    ];
    (prisma.library.findMany as any).mockResolvedValue(rows);

    const out = await service.findUserLibrary(7);

    expect(prisma.library.findMany).toHaveBeenCalledWith({
      where: { userId: 7 },
      include: { game: true },
    });
    expect(out).toEqual(rows);
  });

  it("addGame -> propagates prisma errors", async () => {
    const err = new Error("DB error");
    (prisma.library.create as any).mockRejectedValue(err);

    await expect(
      service.addGame({ userId: 1, gameId: 99 } as any)
    ).rejects.toThrow("DB error");
  });
});
