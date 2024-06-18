import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { OcrService } from './ocr/ocr.service';
import { OcrModule } from './ocr/ocr.module';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';

@Module({
  imports: [UploadModule, OcrModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, OcrService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
