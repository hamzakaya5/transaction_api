import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!roles) return true;

    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    if (!user || !roles.map(r => r).includes(user.role)) {
    throw new ForbiddenException('Insufficient permissions');
  }


    return true;
  }
}
