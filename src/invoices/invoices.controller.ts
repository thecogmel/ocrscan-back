import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvoicesService } from './invoices.service';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { log } from 'console';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post('/ocr')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User
  ) {
    try {
      const upload = await this.invoicesService.uploadFile(file, user);
      const parseImage = await this.invoicesService.parseImage(file.buffer);
      return {
        upload,
        parseImage,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
