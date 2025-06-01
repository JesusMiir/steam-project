import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { LibraryService } from './library.service';
import { AddGameDto } from './dto/add-game.dto';

@Controller('library')
export class LibraryController {
    constructor(private readonly libraryService: LibraryService) {}

    @Post()
    addGame(@Body() addGameDto: AddGameDto) {
        return this.libraryService.addGame(addGameDto);
    }

    @Get(':userId')
    findUserLibrary(@Param('userId') userId: string) {
        return this.libraryService.findUserLibrary(+userId)
    }
}
