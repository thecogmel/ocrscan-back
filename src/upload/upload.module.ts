import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { OcrService } from 'src/ocr/ocr.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, OcrService],
})
export class UploadModule {}
