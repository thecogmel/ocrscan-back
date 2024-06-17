import { Injectable } from '@nestjs/common';
import * as tesseract from 'node-tesseract-ocr';

@Injectable()
export class OcrService {
  async parseImage(imageBuffer: Express.Multer.File['buffer']) {
    try {
      const text = await tesseract.recognize(imageBuffer, {
        oem: 1,
        psm: 4,
        lang: 'eng',
      });
      return text.split('\n');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
