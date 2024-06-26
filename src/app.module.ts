import { Module } from '@nestjs/common';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, InvoicesModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
