// src/games/dto/create-game.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  genre: string;
}
