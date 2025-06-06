"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToCart(addToCartDto) {
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
    getUserCart(userId) {
        return this.prisma.cart.findFirst({
            where: {
                userId,
            },
            include: {
                cartItems: {
                    include: {
                        game: true,
                    },
                },
            },
        });
    }
    async checkout(userId) {
        const cart = await this.prisma.cart.findFirst({
            where: { userId },
            include: {
                cartItems: true,
            }
        });
        if (!cart || cart.cartItems.length === 0) {
            throw new Error('Cart is empty or does not exist');
        }
        const libraryEntries = cart.cartItems.map((item) => this.prisma.library.create({
            data: {
                userId,
                gameId: item.gameId,
            },
        }));
        await this.prisma.$transaction(libraryEntries);
        await this.prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
            },
        });
        return { message: 'Checkout completed, games added to library' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map