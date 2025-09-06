import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaService } from "src/prisma/prisma.service";

export type PrismaMock = DeepMockProxy<PrismaService>;
export const createPrismaMock = () => mockDeep<PrismaService>();
