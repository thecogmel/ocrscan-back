import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { OcrService } from 'src/ocr/ocr.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [UploadController],
  providers: [UploadService, OcrService, PrismaService],
})
export class UploadModule {}
