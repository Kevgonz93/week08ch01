import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

const mockPetService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findPasswordForLogin: jest.fn(),
};

describe('PetsController', () => {
  let controller: PetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        {
          provide: PetsService,
          useValue: mockPetService,
        },
      ],
    }).compile();

    controller = module.get<PetsController>(PetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When we use findAll method', () => {
    const mockPets = [
      { id: '1', name: 'test' },
      { id: '2', name: 'test' },
      { id: '3', name: 'test' },
    ];
    it('should return all pets', async () => {
      mockPetService.findAll.mockReturnValue(mockPets);
      await expect(controller.findAll()).toBe(mockPets);
    });
  });

  describe('When we use findOne method', () => {
    const mockPets = [
      { id: '1', name: 'test' },
      { id: '2', name: 'test' },
      { id: '3', name: 'test' },
    ];
    it('should return one pet', async () => {
      mockPetService.findOne.mockReturnValue(mockPets);

      await expect(controller.findOne('1')).toEqual(
        mockPetService.findOne('1'),
      );
    });
  });

  describe('When we use create method', () => {
    const newData = { name: 'test', type: 'test', ownerId: '' };
    it('should create a new data', async () => {
      mockPetService.create.mockResolvedValue(newData);
      await expect(controller.create(newData)).toEqual(
        mockPetService.create(newData),
      );
    });
  });

  describe('When we use update method', () => {
    const mockPets = [
      { id: '1', name: 'test' },
      { id: '2', name: 'test' },
      { id: '3', name: 'test' },
    ];
    const updateData = { name: 'test', type: 'test', age: 2 };
    it('Should return a pet update', async () => {
      mockPetService.update.mockResolvedValue(mockPets);
      await expect(controller.update('1', updateData)).toEqual(
        mockPetService.update('1', updateData),
      );
    });
  });

  describe('When we use delete method', () => {
    const mockPets = [
      { id: '1', name: 'test' },
      { id: '2', name: 'test' },
      { id: '3', name: 'test' },
    ];
    it('should delete a pet', async () => {
      mockPetService.delete.mockResolvedValue(mockPets);
      expect(controller.remove('3')).toEqual(mockPetService.delete('3'));
    });
  });
});
