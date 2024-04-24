import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUserService = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When we use findAll method', () => {
    const mockUsers = [
      { id: '1', name: 'Lolo' },
      { id: '2', name: 'Ernestina' },
    ];
    it('should return all users', async () => {
      mockUserService.findAll.mockReturnValue(mockUsers);
      expect(controller.GetAll()).toBe(mockUserService.findAll());
      expect(controller.GetAll()).toEqual([
        { id: '1', name: 'Lolo' },
        { id: '2', name: 'Ernestina' },
      ]);
    });
  });

  describe('When we use findById method', () => {
    const mockUsers = [
      { id: '1', name: 'Lolo' },
      { id: '2', name: 'Ernestina' },
    ];
    it('should return one user', async () => {
      mockUserService.findById.mockReturnValue(mockUsers);
      expect(controller.getById('1')).toBe(mockUserService.findById('1'));
    });
  });

  describe('When we use create method', () => {
    const newData = { name: 'test', email: 'test', password: 'test' };
    it('should create a new data', async () => {
      mockUserService.create.mockResolvedValue(newData);
      await expect(controller.create(newData)).toEqual(
        mockUserService.create(newData),
      );
    });
  });
  describe('When we use update method', () => {
    const mockUsers = [
      { id: '1', name: 'Lolo' },
      { id: '2', name: 'Ernestina' },
    ];
    const updateData = { name: 'test', email: 'test', password: 'test' };
    it('Should return a pet update', async () => {
      mockUserService.update.mockResolvedValue(mockUsers);
      await expect(controller.update('1', updateData)).toEqual(
        mockUserService.update('1', updateData),
      );
    });
  });

  describe('When we use delete method', () => {
    const mockUsers = [
      { id: '1', name: 'Lolo' },
      { id: '2', name: 'Ernestina' },
    ];
    it('should delete a pet', async () => {
      mockUserService.delete.mockResolvedValue(mockUsers);
      expect(controller.delete('2')).toEqual(mockUserService.delete('2'));
    });
  });
});
