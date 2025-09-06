import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../auth/decorators/user.decorator';


@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @Auth()
  @Roles('vendor', 'admin')
  create(@Body() dto: any, @User() user: any) {
    return this.transactionService.create(dto, user.sub);
  }

  @Get('all')
  @Auth()
  @Roles('admin')
  findAll() {
    return this.transactionService.findAll();
  }

  @Get('me')
  @Auth()
  @Roles('vendor', 'admin')
  findMine(@User() user: any) {
    if (user.role === 'admin') return this.transactionService.findAll();
    return this.transactionService.findByUser(user.sub);
  }
}
