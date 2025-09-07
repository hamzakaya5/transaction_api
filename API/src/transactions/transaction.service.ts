import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { Sequelize, Op, fn, col, literal } from 'sequelize';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
// import { fn, col, literal } from 'sequelize';
@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction) private transactionModel: typeof Transaction) {}

  async create(dto: any, userId: number) {
    const statusList: { [key: number]: string } = {
    1: "authorized",
    2: "captured",
    3: "failed",
    4: "refunded",
  };
    const randomStatus = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const status = statusList[randomStatus];
    console.log(status);

    return this.transactionModel.create({ ...dto, belongTo:userId, status: status });
  }

  async findAll() {
    return this.transactionModel.findAll();
  }

  async findByUser(userId: number) {
    return this.transactionModel.findAll({ where: { belongTo: userId } });
  }

  // async filterBy(min: number, max: number, minDate: Date, maxDate: Date, userId: number, isAdmin: boolean) {


  async filterBy(dto: FilterTransactionDto, userId: number, isAdmin: boolean) {
    const where: any = {
      amount: { [Op.between]: [dto.min ?? 0, dto.max ?? 0] },
      createdAt: { [Op.between]: [dto.minDate , dto.maxDate ] },
    };

    if (!isAdmin) {
      where.belongTo = userId;
    }

    if (dto.status) {
      where.status = dto.status;
    }

    if (dto.cardBrand) {
      // ✅ Use literal instead of Sequelize.json
      where[Op.and] = Sequelize.where(
        Sequelize.literal(`pgextrainfo->>'cardBrand'`),
        {
          [Op.iLike]: `%${dto.cardBrand}%`,
        },
      );
    }

    return this.transactionModel.findAll({ where });
  }



  async reportByDay(userId: number, isAdmin: boolean) {
    const where: any = {};
    if (!isAdmin) {
      where.belongTo = userId;
    }


    return this.transactionModel.findAll({
      attributes: [
        [fn('DATE', col('createdAt')), 'day'],
        [literal(`"Transaction"."pgextrainfo"->>'cardBrand'`), 'cardBrand'],
        [fn('COUNT', col('id')), 'transaction_count'],
        [fn('SUM', col('amount')), 'total_amount'],
      ],
      where,
      group: [
        fn('DATE', col('createdAt')),
        literal(`"Transaction"."pgextrainfo"->>'cardBrand'`) as any   // ✅
      ],
      order: [
        [fn('DATE', col('createdAt')), 'ASC'],
        literal(`"Transaction"."pgextrainfo"->>'cardBrand' ASC`) as any // ✅
      ],
      raw: true,
    });


  }



  //   return this.transactionModel.findAll({ where: { belongTo: userId } });
  // }

}
