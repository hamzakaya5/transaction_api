import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Timestamp } from 'rxjs';

@Table({ tableName: 'transactions' ,
  timestamps: true, 
})
export class Transaction extends Model<Transaction> {
  @Column({ type: DataType.FLOAT, allowNull: false })
  amount: number;

  @Column({ type: DataType.STRING, allowNull: false })
  currency: string;

  @Column({
    type: DataType.ENUM('authorized', 'captured', 'refunded', 'failed'),
    allowNull: false
  })
  status: string;

  @Column({ type: DataType.JSONB, allowNull: false, field: 'pgextrainfo' })
  pgextrainfo: any;

  @ForeignKey(() => User)
  @Column
  belongTo: number;
  
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
