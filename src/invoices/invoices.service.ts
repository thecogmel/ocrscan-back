import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { PrismaService } from 'nestjs-prisma';
import * as tesseract from 'node-tesseract-ocr';
import { User } from 'src/users/entities/user.entity';
import { extractValuesBetween, parseItemString } from 'src/utils/helpers';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async parseImage(
    imageBuffer: Express.Multer.File['buffer'],
    invoice_id: string
  ) {
    try {
      const text = await tesseract.recognize(imageBuffer, {
        oem: 1,
        psm: 4,
        lang: 'eng',
      });
      await this.prisma.invoice.update({
        where: {
          id: invoice_id,
        },
        data: {
          processed_at: new Date(),
          status: Status.COMPLETE,
        },
      });
      const textArray = text.split('\n');

      const productsExtracted = extractValuesBetween(
        textArray,
        'UNIDADE',
        'Subtotal'
      );
      const itemsParsed = productsExtracted.map((item) =>
        parseItemString(item)
      );

      const totalIndex = textArray.findIndex((line) => line.includes('TOTAL'));
      let totalValue = 0;
      if (totalIndex !== -1) {
        const totalLine = textArray[totalIndex];
        totalValue = parseFloat(totalLine.split(' ')[1]);
      } else {
        console.log('Total não encontrado no array.');
      }

      await this.prisma.item.createMany({
        data: itemsParsed.map((item) => ({
          ...item,
          invoiceId: invoice_id,
        })),
      });

      return {
        items: itemsParsed,
        total: totalValue,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async uploadFile(file: Express.Multer.File, user: User) {
    const supabaseURL = 'https://nvtvaoijcjxlhzspqwdh.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dHZhb2lqY2p4bGh6c3Bxd2RoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODY0MzgyNywiZXhwIjoyMDM0MjE5ODI3fQ.bPIJUgf4KUOEVf3_CJ5OX34S0utu8byBM0ExazqP1Jc';
    const supabase = createClient(supabaseURL, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    try {
      await supabase.storage
        .from('ocr')
        .upload(file.originalname, file.buffer, { upsert: true });

      const publicURL = supabase.storage
        .from('ocr')
        .getPublicUrl(file.originalname);

      const invoice = await this.prisma.invoice.create({
        data: {
          user_id: user.id,
          url: publicURL.data.publicUrl,
        },
      });

      return {
        url: publicURL.data.publicUrl,
        invoice_id: invoice.id,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(user: User) {
    const invoices = await this.prisma.invoice.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        Item: true,
      },
    });
    return invoices.map((invoice) => {
      return {
        ...invoice,
        Item: undefined,
        items: invoice.Item.map((item) => {
          return {
            ...item,
          };
        }),
      };
    });
  }
}
