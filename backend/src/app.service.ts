import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {
    console.log('✅ PrismaService in AppService constructor');
  }

  getHello(): string {
    return 'Hello World'; 
  }
}