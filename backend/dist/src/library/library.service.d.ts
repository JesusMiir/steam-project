import { PrismaService } from 'src/prisma/prisma.service';
import { AddGameDto } from './dto/add-game.dto';
export declare class LibraryService {
    private prisma;
    constructor(prisma: PrismaService);
    addGame(addGameDto: AddGameDto): import(".prisma/client").Prisma.Prisma__LibraryClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        gameId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findUserLibrary(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
        userId: number;
        gameId: number;
    })[]>;
}
