/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from './pets.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { mock } from 'node:test';
import { CreatePetDto } from './entities/pet.dto';
import { error } from 'console';

const mockPrismaService = {
  findMany: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const mockPetService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

describe('PetsService', () => {
  let service: PetsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PetsService],
    }).compile();

    service = module.get<PetsService>(PetsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When we use findAll method', () => {
    const mockPets = [
      { id: '1', name: 'test' },
      { id: '2', name: 'test' },
      { id: '3', name: 'test' },
    ];
    it('should return all data', async () => {
      mockPrismaService.findMany.mockReturnValue(mockPets);
      mockPetService.findAll.mockReturnValue(mockPets);

      const prismaResult = await prismaService.pet.findMany();
      const petResult = await service.findAll();
      expect(prismaResult).toEqual(petResult);
    });
  });

  describe('When we use findOne method', () => {
    const mockPets = [
      { id: '1', name: 'test' },
      { id: '2', name: 'test' },
      { id: '3', name: 'test' },
    ];
    it('should return one data', async () => {
      mockPrismaService.findUnique.mockReturnValue(mockPets);
      mockPetService.findOne.mockReturnValue(mockPets);

      const prismaResult = await prismaService.pet.findUnique({
        where: { id: '1' },
      });
      const petResult = await service.findOne('1');
      await expect(prismaResult).toEqual(petResult);
    });

    // it('should return an error', async () => {
    //   const mockPet = { id: 1, name: 12345 };
    //   mockPrismaService.findUnique.mockReturnValue(mockPet);
    //   mockPetService.findOne.mockReturnValue(mockPet);

    //   await expect(service.findOne('1')).rejects.toThrow(
    //     new NotFoundException(),
    //   );
    // });
  });

  describe('When we use create method', () => {
    const mockData = {
      name: 'test',
      type: 'dog',
      age: 2,
      ownerId: '',
    };
    const mockCreateDto = { id: '', name: '', type: '' };
    it('Should create a new data', async () => {
      mockPrismaService.create.mockReturnValue(mockData);
      mockPetService.create.mockReturnValue(mockData);

      const petResult = service.create(mockData);

      await expect(petResult).toBeTruthy();
    });
  });

  describe('When we use update method', () => {});
});
