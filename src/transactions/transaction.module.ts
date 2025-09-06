import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { RedisModule } from '../redis/redis.module';   // ✅ ekle

@Module({
  imports: [
    SequelizeModule.forFeature([Transaction]),
    RedisModule,  // ✅ RedisService artık bu module’de kullanılabilir
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}