// import { Test, TestingModule } from "@nestjs/testing";
// import { GamesController } from "./games.controller";
// import { GamesService } from "./games.service";
// import { NotFoundException } from "@nestjs/common";

// describe("GamesController", () => {
//   let controller: GamesController;

//   // simple manual mock of the service layer
//   const svc = {
//     list: jest.fn(),
//     findById: jest.fn(),
//   };

//   beforeEach(async () => {
//     jest.clearAllMocks();

//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [GamesController],
//       providers: [{ provide: GamesService, useValue: svc }],
//     }).compile();

//     controller = module.get<GamesController>(GamesController);
//   });

//   it("should be defined", () => {
//     expect(controller).toBeDefined();
//   });

//   /*
//   it("GET /games -> returns list from service", async () => {
//     const mockGames = [
//       { id: 1, title: "Hollow Knight", price: 14.99 },
//       { id: 2, title: "Hades", price: 24.99 },
//     ];
//     svc.list.mockResolvedValue(mockGames);

//     const out = await controller.list();

//     expect(svc.list).toHaveBeenCalledTimes(1);
//     expect(out).toEqual(mockGames);
//   });

//   it("GET /games/:id -> returns a single game", async () => {
//     const mockGame = { id: 7, title: "Celeste", price: 19.99 };
//     svc.findById.mockResolvedValue(mockGame);

//     const out = await controller.byId(7); // direct call (bypasses ParseIntPipe)

//     expect(svc.findById).toHaveBeenCalledWith(7);
//     expect(out).toEqual(mockGame);
//   });

//   it('GET /games/:id -> maps service "not found" to NotFoundException (404)', async () => {
//     // If your controller wraps the error into NotFoundException
//     svc.findById.mockRejectedValue(new Error("Game not found"));

//     await expect(controller.byId(999)).rejects.toBeInstanceOf(
//       NotFoundException
//     );
//     expect(svc.findById).toHaveBeenCalledWith(999);
//   });
//   */
// });
