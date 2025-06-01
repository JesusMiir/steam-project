import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async addToCart(addToCartDto: AddToCartDto) {
    
        let cart = await this.prisma.cart.findFirst({
            where: {
              userId: addToCartDto.userId,
            },
        });

        if (!cart) {
            cart = await this.prisma.cart.create({
              data: {
                userId: addToCartDto.userId,
              },
            });
        }

        return this.prisma.cartItem.create({
            data: {
              cartId: cart.id,
              gameId: addToCartDto.gameId,
            },
        });
    }

    getUserCart(userId: number) {
        return this.prisma.cart.findFirst({
            where: {
              userId,
            },
            include: {
              cartItems: {
                include: {
                  game: true, // Para traer detalles del juego
                },
              },
            },
        });
    }

    async checkout(userId: number) {
      const cart = await this.prisma.cart.findFirst({
        where: { userId },
        include: {
          cartItems: true,
        }
      });

      if (!cart || cart.cartItems.length === 0) {
        throw new Error('Cart is empty or does not exist');
      }

      const libraryEntries = cart.cartItems.map((item) =>
        this.prisma.library.create({
          data: {
            userId,
            gameId: item.gameId,
          },
        }),
      );
    
      await this.prisma.$transaction(libraryEntries);
    
      await this.prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
    
      return { message: 'Checkout completed, games added to library' };

    }
}
