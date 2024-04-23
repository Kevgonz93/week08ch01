import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsersModule, PetsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
