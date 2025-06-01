import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.game.findMany();
    }

    create(createGameDto: CreateGameDto) {
        return this.prisma.game.create({
          data: createGameDto,
        });
    }

    findOne(id: number) {
        return this.prisma.game.findUnique({
          where: { id },
        });
    }

    update(id: number, updateGameDto: UpdateGameDto) {
      return this.prisma.game.update({
        where: { id },
        data: updateGameDto
      })
    }

    async remove(id: number) {
      const game = await this.prisma.game.findUnique({
        where: { id },
      });
  
      if (!game) {
        throw new NotFoundException(`Game with ID ${id} not found`);
      }
  
      return this.prisma.game.delete({
        where: { id },
      });
    }
 }
