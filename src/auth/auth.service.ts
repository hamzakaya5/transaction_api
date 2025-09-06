import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { RedisService } from '../redis/redis.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { emitWarning } from 'process';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private redisService: RedisService,
  ) {}

  async register(username: string, email: string, password: string): Promise<{ id: number; username: string }> {
    const existing = await this.userModel.findOne({ where: { username } });
    if (existing) throw new UnauthorizedException('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const randomInt = Math.floor(Math.random() * (4 - 0 + 1)) + 0;; 
    let role: string; 
    if (randomInt === 0) {
      role = "Admin"
    }else {
      role = "Vendor"
    }

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
      role: role, // ✅ ENUM'dan geliyor
    });
      return { id: user.id, username: user.username };
    }

  async login(username: string, password: string) {
    console.log("here",username, password);
    const user = await this.userModel.findOne({ where: { "username":username } });
    const db_pass = user?.dataValues.password;
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, db_pass);

    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    await this.redisService.set(`session:${user.id}`, token, 3600);

    return { access_token: token };
  }

  async logout(userId: number) {
    await this.redisService.del(`session:${userId}`);
    return { message: 'Logged out successfully' };
  }
}
