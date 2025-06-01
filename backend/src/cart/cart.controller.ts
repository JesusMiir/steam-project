import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    addToCart(@Body() addToCartDto: AddToCartDto) {
        return this.cartService.addToCart(addToCartDto);
    }

    @Get(':userId')
    getUserCart(@Param('userId') userId: string) {
        return this.cartService.getUserCart(+userId);
    }

    @Post('checkout/:userId')
    checkout(@Param('userId') userId: string) {
        return this.cartService.checkout(+userId)
    }
}
