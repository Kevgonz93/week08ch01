import { PartialType } from '@nestjs/mapped-types';

export class CreatePetDto {
  name: string;
  type: string;
  age?: number;
  ownerId: string;
}

export class UpdatePetDto extends PartialType(CreatePetDto) {
  name: string;
  type: string;
  age?: number;
}
