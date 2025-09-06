// src/cart/cart.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

describe("CartController", () => {
  let controller: CartController;

  const svc = {
    addToCart: jest.fn(),
    getUserCart: jest.fn(),
    checkout: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: svc }],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("POST /cart/add -> delegates to service and returns result", async () => {
    const dto = { userId: 7, gameId: 3, quantity: 2 }; // shape must match AddToCartDto
    const mockCart = {
      id: 11,
      userId: 7,
      items: [{ gameId: 3, quantity: 2 }],
    };
    svc.addToCart.mockResolvedValue(mockCart);

    const out = await controller.addToCart(dto as any);

    expect(svc.addToCart).toHaveBeenCalledWith(dto);
    expect(out).toEqual(mockCart);
  });

  it("GET /cart/:userId -> returns cart for user (parses number)", async () => {
    const mockCart = { id: 10, userId: 7, items: [] };
    svc.getUserCart.mockResolvedValue(mockCart);

    const out = await controller.getUserCart("7");

    expect(svc.getUserCart).toHaveBeenCalledWith(7);
    expect(out).toEqual(mockCart);
  });

  it("POST /cart/checkout/:userId -> delegates to service and returns receipt", async () => {
    const receipt = { orderId: "ORD-123", total: 49.98, success: true };
    svc.checkout.mockResolvedValue(receipt);

    const out = await controller.checkout("7");

    expect(svc.checkout).toHaveBeenCalledWith(7);
    expect(out).toEqual(receipt);
  });

  it("propagates service errors (e.g., addToCart)", async () => {
    const dto = { userId: 7, gameId: 999, quantity: 1 };
    const err = new Error("Game not available");
    svc.addToCart.mockRejectedValue(err);

    await expect(controller.addToCart(dto as any)).rejects.toThrow(
      "Game not available"
    );
    expect(svc.addToCart).toHaveBeenCalledWith(dto);
  });
});
