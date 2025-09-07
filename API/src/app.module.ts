import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydb',
      autoLoadModels: true,
      synchronize: true,
      retryAttempts: 10,      // try 10 times
      retryDelay: 5000,   
      logging: (msg) => console.log('Sequelize Log:', msg),
    }),
    UsersModule,
    AuthModule,
    RedisModule,
    TransactionModule,
  ],
})
export class AppModule {}
