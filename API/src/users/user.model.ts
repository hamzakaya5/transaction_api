import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes  } from 'sequelize';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;


  @Column({ 
    type: DataType.ENUM('admin', 'vendor'),
    allowNull: false
   })
  role: string;
}
