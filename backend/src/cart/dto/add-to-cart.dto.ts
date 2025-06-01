import { IsNumber } from 'class-validator';

export class AddToCartDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    gameId: number;
}