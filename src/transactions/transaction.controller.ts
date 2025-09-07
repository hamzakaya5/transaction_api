import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../auth/decorators/user.decorator';
import { FilterTransactionDto } from './dto/filter-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
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

  @Get('user')
  @Auth()
  findMine(@User() user: any) {
    // console.log(user);
    return this.transactionService.findByUser(user.sub);
  }

  @Get('filter')
  @Auth()
  @Roles('admin', 'vendor')
filterTransaction(@Body() dto: FilterTransactionDto, @User() user: any) {
  const isAdmin = user.role === 'admin';
  return this.transactionService.filterBy(dto, user.sub, isAdmin);
}


  @Get('report/daily')
  @Auth()
  @Roles('admin', 'vendor')
  reportTransaction(@User() user: any) {
  const isAdmin = user.role === 'admin';
  return this.transactionService.reportByDay(user.sub, isAdmin);
}

}

