import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRentDto } from './dto/create-rent.dto';
import { RentEntity } from './entities/rent.entity';
import { ActualRentDto } from './dto/actual-rent.dto';
import { CoordRentDto } from './dto/coord-rent.dto';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(RentEntity)
    private repo: Repository<RentEntity>,
  ) {}

  create(dto: CreateRentDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  async coord(dto: CoordRentDto) {
    return await this.repo
      .createQueryBuilder('a')
      .select(['a.lat', 'a.lng', 'a.id'])
      .where('a.lat >= :minLat', dto)
      .andWhere('a.lat <= :maxLat', dto)
      .andWhere('a.lng >= :minLng', dto)
      .andWhere('a.lng <= :maxLng', dto)
      .orderBy('a.createdAt', 'DESC')
      .getMany();
  }

  async actual(dto: ActualRentDto) {
    const [items, total] = await this.repo
      .createQueryBuilder('a')
      .where('a.lat >= :minLat', dto)
      .andWhere('a.lat <= :maxLat', dto)
      .andWhere('a.lng >= :minLng', dto)
      .andWhere('a.lng <= :maxLng', dto)
      .orderBy('a.createdAt', 'DESC')
      .skip(dto.pageNumber * dto.pageSize || 0)
      .take(dto.pageSize || 10)
      .getManyAndCount();
    return {
      items,
      total,
    };
  }

  async findOne(id: string) {
    const find = await this.repo.findOne({ where: { id } });
    if (!find) {
      throw new NotFoundException('Announcement not found');
    }
    return find;
  }
}
