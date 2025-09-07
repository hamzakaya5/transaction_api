import { UseGuards, applyDecorators } from '@nestjs/common';
import { RedisAuthGuard } from '../guards/redis-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth() {
  return applyDecorators(UseGuards(RedisAuthGuard, RolesGuard));
}
