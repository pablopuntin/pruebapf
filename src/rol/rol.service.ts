import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { RolResponseDto } from './dto/rol-response.dto';
import { Rol } from './entities/rol.entity';
import { rol_data } from './data/rol.data';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>
  ) {}

  async create(createRolDto: CreateRolDto): Promise<RolResponseDto> {
    const rol = this.rolRepository.create(createRolDto);
    const savedRol = await this.rolRepository.save(rol);

    return {
      id: savedRol.id,
      name: savedRol.name,
      description: savedRol.description
    };
  }

  async seeder() {
    //Leer data y guardarla en la DB
    await this.rolRepository.upsert(rol_data, ['name']);

    return { message: 'Roles seeded successfully.' };
  }

  async findAll(): Promise<RolResponseDto[]> {
    const roles = await this.rolRepository.find({
      order: { name: 'ASC' }
    });

    return roles.map((rol) => ({
      id: rol.id,
      name: rol.name,
      description: rol.description
    }));
  }

  async findOne(id: string): Promise<RolResponseDto> {
    const rol = await this.rolRepository.findOne({
      where: { id }
    });

    if (!rol) {
      throw new Error('Rol no encontrado');
    }

    return {
      id: rol.id,
      name: rol.name,
      description: rol.description
    };
  }

  async update(
    id: string,
    updateRolDto: UpdateRolDto
  ): Promise<RolResponseDto> {
    await this.rolRepository.update(id, updateRolDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.rolRepository.delete(id);
  }
}
