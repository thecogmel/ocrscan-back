import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const data = createUserDto;
    data.password = await hashPassword(createUserDto.password);

    return this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => user);
  }

  async findOne(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUniqueOrThrow({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    const data = updateUserDto;
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
