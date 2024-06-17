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
    const parseImage = await this.ocrService.parseImage(file.buffer);

    const regex = /^(.+)\s+([\d]+)\s*(km|quilômetros)$/i;

    const result = parseImage
      .filter((linha) => regex.test(linha))
      .map((linha) => {
        const matches = regex.exec(linha);
        if (matches) {
          return { cidade: matches[1], distancia: matches[2] };
        } else {
          return null; // or handle the case when matches is null
        }
      });
    return result;
  }
}
