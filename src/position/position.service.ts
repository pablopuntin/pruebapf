import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionResponseDto } from './dto/position-response.dto';
import { Position } from './entities/position.entity';
import { positions_data } from './data/position.data';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>
  ) {}

  async create(
    createPositionDto: CreatePositionDto
  ): Promise<PositionResponseDto> {
    const position = this.positionRepository.create(createPositionDto);
    const savedPosition = await this.positionRepository.save(position);

    return {
      id: savedPosition.id,
      name: savedPosition.name,
      description: savedPosition.description,
      createdAt: savedPosition.createdAt,
      updatedAt: savedPosition.updatedAt
    };
  }

  async findAll(): Promise<PositionResponseDto[]> {
    const positions = await this.positionRepository.find({
      order: { name: 'ASC' }
    });

    return positions.map((position) => ({
      id: position.id,
      name: position.name,
      description: position.description,
      createdAt: position.createdAt,
      updatedAt: position.updatedAt
    }));
  }

  async seeder() {
    //Leer data y guardarla en la DB
    await this.positionRepository.upsert(positions_data, ['name']);

    return { message: 'Positions seeded successfully.' };
  }

  async findOne(id: string): Promise<PositionResponseDto> {
    const position = await this.positionRepository.findOne({
      where: { id }
    });

    if (!position) {
      throw new Error('Puesto no encontrado');
    }

    return {
      id: position.id,
      name: position.name,
      description: position.description,
      createdAt: position.createdAt,
      updatedAt: position.updatedAt
    };
  }

  async update(
    id: string,
    updatePositionDto: UpdatePositionDto
  ): Promise<PositionResponseDto> {
    await this.positionRepository.update(id, updatePositionDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.positionRepository.softDelete(id);
  }
}
