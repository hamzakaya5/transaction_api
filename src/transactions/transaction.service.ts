import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';

@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction) private transactionModel: typeof Transaction) {}

  async create(dto: any, userId: number) {
    return this.transactionModel.create({ ...dto, userId });
  }

  async findAll() {
    return this.transactionModel.findAll();
  }

  async findByUser(userId: number) {
    return this.transactionModel.findAll({ where: { belongTo: userId } });
  }
}
