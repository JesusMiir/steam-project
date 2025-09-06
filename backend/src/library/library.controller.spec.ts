import { Test, TestingModule } from "@nestjs/testing";
import { LibraryController } from "./library.controller";
import { LibraryService } from "./library.service";

describe("LibraryController", () => {
  let controller: LibraryController;

  const svc = {
    addGame: jest.fn(),
    findUserLibrary: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryController],
      providers: [{ provide: LibraryService, useValue: svc }],
    }).compile();

    controller = module.get<LibraryController>(LibraryController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("POST /library -> delegates to service.addGame and returns result", async () => {
    const dto = { userId: 7, gameId: 3 }; // match your AddGameDto shape
    const created = { id: 42, userId: 7, gameId: 3 };

    svc.addGame.mockResolvedValue(created);

    const out = await controller.addGame(dto as any);

    expect(svc.addGame).toHaveBeenCalledWith(dto);
    expect(out).toEqual(created);
  });

  it("GET /library/:userId -> parses param to number and returns library", async () => {
    const library = [
      { id: 1, userId: 7, gameId: 3, game: { id: 3, title: "Hades" } },
      { id: 2, userId: 7, gameId: 5, game: { id: 5, title: "Celeste" } },
    ];

    svc.findUserLibrary.mockResolvedValue(library);

    const out = await controller.findUserLibrary("7");

    expect(svc.findUserLibrary).toHaveBeenCalledWith(7);
    expect(out).toEqual(library);
  });

  it("propagates service errors (POST /library)", async () => {
    const dto = { userId: 7, gameId: 999 };
    const err = new Error("Game not found");
    svc.addGame.mockRejectedValue(err);

    await expect(controller.addGame(dto as any)).rejects.toThrow(
      "Game not found"
    );
    expect(svc.addGame).toHaveBeenCalledWith(dto);
  });

  it("propagates service errors (GET /library/:userId)", async () => {
    const err = new Error("User not found");
    svc.findUserLibrary.mockRejectedValue(err);

    await expect(controller.findUserLibrary("123")).rejects.toThrow(
      "User not found"
    );
    expect(svc.findUserLibrary).toHaveBeenCalledWith(123);
  });
});
