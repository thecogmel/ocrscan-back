import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.invoicesService.findAll(user);
  }

  @Post('/ocr')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User
  ) {
    try {
      const upload = await this.invoicesService.uploadFile(file, user);
      const parseImage = await this.invoicesService.parseImage(
        file.buffer,
        upload.invoice_id
      );
      return {
        upload: upload.url,
        parseImage,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
