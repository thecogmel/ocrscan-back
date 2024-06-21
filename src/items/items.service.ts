import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    return await this.prismaService.item.create({
      data: createItemDto,
    });
  }

  async createMany(createItemDto: CreateItemDto[]) {
    return await this.prismaService.item.createManyAndReturn({
      data: createItemDto,
    });
  }

  async findAll() {
    const items = await this.prismaService.item.findMany();
    return items.map((item) => item);
  }

  findOne(id: string) {
    const item = this.prismaService.item.findUnique({
      where: {
        id,
      },
    });
    return item;
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: string) {
    return `This action removes a #${id} item`;
  }
}
