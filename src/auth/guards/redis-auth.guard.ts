import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RedisAuthGuard implements CanActivate {
  constructor(private redisService: RedisService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, 'secretKey') as any;
      const session = await this.redisService.get(`session:${payload.sub}`);

      if (!session || session !== token) throw new UnauthorizedException('Invalid session');

      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
