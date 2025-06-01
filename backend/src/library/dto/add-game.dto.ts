import { IsNumber } from 'class-validator';

export class AddGameDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    gameId: number;
}