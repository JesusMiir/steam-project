import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddGameDto } from './dto/add-game.dto';

@Injectable()
export class LibraryService {
    constructor(private prisma: PrismaService) {}

    addGame(addGameDto: AddGameDto) {
        return this.prisma.library.create({
            data: {
                userId: addGameDto.userId,
                gameId: addGameDto.gameId
            }
        });
    }

    findUserLibrary(userId: number) {
        return this.prisma.library.findMany({
            where: { userId },
            include: { game: true}
        })
    }
}
