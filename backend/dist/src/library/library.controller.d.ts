import { LibraryService } from './library.service';
import { AddGameDto } from './dto/add-game.dto';
export declare class LibraryController {
    private readonly libraryService;
    constructor(libraryService: LibraryService);
    addGame(addGameDto: AddGameDto): import(".prisma/client").Prisma.Prisma__LibraryClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        gameId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findUserLibrary(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
