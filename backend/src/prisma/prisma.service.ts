import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      console.log('🔍 DATABASE_URL:', process.env.DATABASE_URL);
      await this.$connect();
      console.log('✅ Connected to database.');
    } catch (err) {
      console.error('❌ Prisma failed:', err?.message || err);
      process.exit(1);
    }
  }
}
