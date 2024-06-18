import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from 'src/ocr/ocr.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly ocrService: OcrService
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const upload = await this.uploadService.uploadFile(file);
      const parseImage = await this.ocrService.parseImage(file.buffer);
      return {
        upload,
        parseImage,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
