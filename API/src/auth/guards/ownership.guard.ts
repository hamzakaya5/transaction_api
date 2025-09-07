import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user; // JWT payload
    const reqId = parseInt(req.params.id, 10); // URL parametre id

    // Admin her şeyi yapabilir
    if (user.role === 'Admin') {
      return true;
    }

    // Vendor sadece kendi id'siyle eşleşiyorsa işlem yapabilir
    if (user.sub === reqId) {
      return true;
    }

    throw new ForbiddenException('You can only act on your own record');
  }
}
