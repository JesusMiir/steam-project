import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(addToCartDto: AddToCartDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        gameId: number;
        cartId: number;
    }>;
    getUserCart(userId: number): import(".prisma/client").Prisma.Prisma__CartClient<({
        cartItems: ({
            game: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string;
                price: number;
                genre: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            gameId: number;
            cartId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    checkout(userId: number): Promise<{
        message: string;
    }>;
}
