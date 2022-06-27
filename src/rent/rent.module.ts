import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { RentEntity } from './entities/rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity])],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
