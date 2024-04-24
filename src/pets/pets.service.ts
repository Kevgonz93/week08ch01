import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto, UpdatePetDto } from './entities/pet.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.pet.findMany();
  }

  async findOne(id: string) {
    const data = this.prismaService.pet.findUnique({ where: { id } });
    if (!data) {
      throw await new NotFoundException(`User ${id} not found`);
    }
    return await data;
  }

  async create(data: CreatePetDto) {
    if (typeof data.age !== 'number') {
      throw new NotFoundException('Data invalid');
    }
    return this.prismaService.pet.create({ data: { age: data.age, ...data } });
  }

  async update(id: string, data: UpdatePetDto) {
    try {
      const userUpdate = this.prismaService.user.update({
        where: { id },
        data,
      });
      return await userUpdate;
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  async delete(id: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const animal = await this.prismaService.pet.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
