import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import type { Response } from "express";

describe("AuthController", () => {
  let controller: AuthController;

  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  } as unknown as PrismaService;

  const jwt = {
    sign: jest.fn(),
  } as unknown as JwtService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("GET /auth/callback/google -> existing user: signs and redirects", async () => {
    const profile = {
      email: "alice@example.com",
      name: "Alice",
      firstName: "Alice",
      lastName: "Doe",
      picture: "https://pic",
    };
    const req = { user: profile } as any;
    const res = { redirect: jest.fn() } as Partial<Response> as Response;

    (prisma.user.findUnique as any).mockResolvedValue({
      id: 10,
      email: profile.email,
    });
    (jwt.sign as any).mockReturnValue("TOKEN123");

    await controller.googleAuthRedirect(req, res);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: "alice@example.com" },
    });
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalledWith({
      sub: 10,
      email: "alice@example.com",
    });
    expect(res.redirect).toHaveBeenCalledWith(
      "http://localhost:5173/login/success?token=TOKEN123"
    );
  });

  it("GET /auth/callback/google -> new user: creates, signs and redirects", async () => {
    const profile = {
      email: "new@example.com",
      firstName: "New",
      lastName: "User",
      picture: "https://pic",
    };
    const req = { user: profile } as any;
    const res = { redirect: jest.fn() } as Partial<Response> as Response;

    (prisma.user.findUnique as any).mockResolvedValue(null);
    (prisma.user.create as any).mockResolvedValue({
      id: 99,
      email: "new@example.com",
    });
    (jwt.sign as any).mockReturnValue("JWT999");

    await controller.googleAuthRedirect(req, res);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: "new@example.com" },
    });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "New User", // name fallback from firstName + lastName
        email: "new@example.com",
        firstName: "New",
        lastName: "User",
        image: "https://pic",
        provider: "google",
      },
    });
    expect(jwt.sign).toHaveBeenCalledWith({
      sub: 99,
      email: "new@example.com",
    });
    expect(res.redirect).toHaveBeenCalledWith(
      "http://localhost:5173/login/success?token=JWT999"
    );
  });

  it("GET /auth/google -> no-op (guard handles redirect)", async () => {
    await expect(controller.googleAuth({} as any)).resolves.toBeUndefined();
  });

  it("GET /auth/me -> returns req.user (guard injects it)", () => {
    const req = { user: { id: 1, email: "u@x.com" } } as any;
    expect(controller.getProfile(req)).toEqual({ id: 1, email: "u@x.com" });
  });
});
