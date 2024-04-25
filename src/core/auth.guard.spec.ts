/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestingModule, Test } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { CryptoService } from './crypto.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const mockJwtService = {} as unknown as JwtService;

const mockConfigService = {} as unknown as ConfigService;

describe('AuthGuard', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(new AuthGuard(mockJwtService, mockConfigService)).toBeDefined();
  });
});
