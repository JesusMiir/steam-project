import { Test, TestingModule } from "@nestjs/testing";
import { CartService } from "./cart.service";
import { PrismaService } from "src/prisma/prisma.service";

describe("CartService", () => {
  let service: CartService;

  // Minimal Prisma mock covering methods CartService uses
  const prisma = {
    cart: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    cartItem: {
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    library: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  } as unknown as PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(CartService);
  });

  // ──────────────────────────────────────────────────────────────
  // addToCart
  // ──────────────────────────────────────────────────────────────
  it("addToCart -> creates cart when user has none, then creates item", async () => {
    (prisma.cart.findFirst as any).mockResolvedValue(null);
    (prisma.cart.create as any).mockResolvedValue({ id: 10, userId: 7 });
    (prisma.cartItem.create as any).mockResolvedValue({
      id: 77,
      cartId: 10,
      gameId: 3,
    });

    const dto = { userId: 7, gameId: 3 }; // AddToCartDto shape
    const out = await service.addToCart(dto as any);

    expect(prisma.cart.findFirst).toHaveBeenCalledWith({
      where: { userId: 7 },
    });
    expect(prisma.cart.create).toHaveBeenCalledWith({ data: { userId: 7 } });
    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: { cartId: 10, gameId: 3 },
    });
    expect(out).toEqual({ id: 77, cartId: 10, gameId: 3 });
  });

  it("addToCart -> reuses existing cart", async () => {
    (prisma.cart.findFirst as any).mockResolvedValue({ id: 5, userId: 7 });
    (prisma.cartItem.create as any).mockResolvedValue({
      id: 70,
      cartId: 5,
      gameId: 2,
    });

    const out = await service.addToCart({ userId: 7, gameId: 2 } as any);

    expect(prisma.cart.create).not.toHaveBeenCalled();
    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: { cartId: 5, gameId: 2 },
    });
    expect(out).toEqual({ id: 70, cartId: 5, gameId: 2 });
  });

  // ──────────────────────────────────────────────────────────────
  // getUserCart
  // ──────────────────────────────────────────────────────────────
  it("getUserCart -> returns cart with items and game details", async () => {
    const mockCart = {
      id: 5,
      userId: 7,
      cartItems: [{ id: 1, gameId: 2, game: { id: 2, title: "Hades" } }],
    };
    (prisma.cart.findFirst as any).mockResolvedValue(mockCart);

    const out = await service.getUserCart(7);

    expect(prisma.cart.findFirst).toHaveBeenCalledWith({
      where: { userId: 7 },
      include: {
        cartItems: {
          include: { game: true },
        },
      },
    });
    expect(out).toEqual(mockCart);
  });

  // ──────────────────────────────────────────────────────────────
  // checkout
  // ──────────────────────────────────────────────────────────────
  it("checkout -> throws if cart missing or empty", async () => {
    (prisma.cart.findFirst as any).mockResolvedValue(null);

    await expect(service.checkout(7)).rejects.toThrow(
      "Cart is empty or does not exist"
    );
    expect(prisma.$transaction).not.toHaveBeenCalled();

    (prisma.cart.findFirst as any).mockResolvedValue({
      id: 5,
      userId: 7,
      cartItems: [],
    });
    await expect(service.checkout(7)).rejects.toThrow(
      "Cart is empty or does not exist"
    );
  });

  it("checkout -> creates library entries, clears cart, returns message", async () => {
    const cart = {
      id: 5,
      userId: 7,
      cartItems: [{ gameId: 2 }, { gameId: 3 }],
    };
    (prisma.cart.findFirst as any).mockResolvedValue(cart);

    // library.create is called once per cart item to build the promises array
    (prisma.library.create as any)
      .mockReturnValueOnce(Promise.resolve({ id: 100, userId: 7, gameId: 2 }))
      .mockReturnValueOnce(Promise.resolve({ id: 101, userId: 7, gameId: 3 }));

    // $transaction runs the array of Prisma promises
    (prisma.$transaction as any).mockResolvedValue([
      { id: 100, userId: 7, gameId: 2 },
      { id: 101, userId: 7, gameId: 3 },
    ]);

    (prisma.cartItem.deleteMany as any).mockResolvedValue({ count: 2 });

    const out = await service.checkout(7);

    expect(prisma.library.create).toHaveBeenCalledTimes(2);
    expect(prisma.library.create).toHaveBeenNthCalledWith(1, {
      data: { userId: 7, gameId: 2 },
    });
    expect(prisma.library.create).toHaveBeenNthCalledWith(2, {
      data: { userId: 7, gameId: 3 },
    });

    expect(prisma.$transaction).toHaveBeenCalled();
    // Optionally: assert it received an array of promises
    const txArg = (prisma.$transaction as jest.Mock).mock.calls[0][0];
    expect(Array.isArray(txArg)).toBe(true);
    expect(txArg).toHaveLength(2);

    expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { cartId: 5 },
    });
    expect(out).toEqual({
      message: "Checkout completed, games added to library",
    });
  });
});
