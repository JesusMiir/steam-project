import { Test, TestingModule } from "@nestjs/testing";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { NotFoundException } from "@nestjs/common";

describe("GamesController", () => {
  let controller: GamesController;

  // simple manual mock of the service layer
  const svc = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [{ provide: GamesService, useValue: svc }],
    }).compile();

    controller = module.get<GamesController>(GamesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("GET /games -> returns list from service", async () => {
    const mockGames = [
      { id: 1, title: "Hollow Knight", price: 14.99 },
      { id: 2, title: "Hades", price: 24.99 },
    ];
    svc.findAll.mockResolvedValue(mockGames);

    const out = await controller.findAll();

    expect(svc.findAll).toHaveBeenCalledTimes(1);
    expect(out).toEqual(mockGames);
  });

  it("GET /games/:id -> returns a single game", async () => {
    const mockGame = { id: 7, title: "Celeste", price: 19.99 };
    svc.findOne.mockResolvedValue(mockGame);

    // controller receives id as string and converts with +id
    const out = await controller.findOne("7");

    expect(svc.findOne).toHaveBeenCalledWith(7);
    expect(out).toEqual(mockGame);
  });

  it("GET /games/:id -> rethrows service error (e.g., not found)", async () => {
    svc.findOne.mockRejectedValue(new Error("Game not found"));
    await expect(controller.findOne("999")).rejects.toThrow("Game not found");
    expect(svc.findOne).toHaveBeenCalledWith(999);
  });

  it("POST /games -> creates a game", async () => {
    const dto = {
      title: "New",
      description: "desc",
      price: 9.99,
      genre: "Indie",
    };
    const created = { id: 10, ...dto };
    svc.create.mockResolvedValue(created);

    const out = await controller.create(dto as any);

    expect(svc.create).toHaveBeenCalledWith(dto);
    expect(out).toEqual(created);
  });

  it("PATCH /games/:id -> updates a game", async () => {
    const dto = { title: "Updated" };
    const updated = {
      id: 5,
      title: "Updated",
      description: "desc",
      price: 9.99,
      genre: "Indie",
    };
    svc.update.mockResolvedValue(updated);

    const out = await controller.update("5", dto as any);

    expect(svc.update).toHaveBeenCalledWith(5, dto);
    expect(out).toEqual(updated);
  });

  it("DELETE /games/:id -> removes a game", async () => {
    svc.remove.mockResolvedValue(undefined); // adjust if your service returns something
    await controller.remove("5");
    expect(svc.remove).toHaveBeenCalledWith(5);
  });
});
