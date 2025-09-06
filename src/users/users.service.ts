import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll() {
    return this.userModel.findAll();
  }

  async findById(id: number) {
    return this.userModel.findByPk(id);
  }

  async updateUser(id: number, data: Partial<User>) {
    await this.userModel.update(data, { where: { id } });
    return this.findById(id);
  }

  async deleteUser(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
