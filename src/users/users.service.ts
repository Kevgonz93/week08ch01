/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './entities/user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string) {
    const data = this.prismaService.user.findUnique({ where: { id } });
    if (!data) {
      throw await new NotFoundException(`User ${id} not found`);
    }
    return data;
  }

  async create(data: CreateUserDto) {
    try {
      const newUser = this.prismaService.user.create({ data });
      return newUser;
    } catch (error) {
      throw new NotFoundException(`Data invalid`);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const userUpdate = this.prismaService.user.update({
        where: { id },
        data,
      });
      return userUpdate;
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  async delete(id: string) {
    try {
      const user = await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
