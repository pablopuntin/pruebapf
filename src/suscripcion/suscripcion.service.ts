import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import { Suscripcion } from './entities/suscripcion.entity';

@Injectable()
export class SuscripcionService {
  constructor(
    @InjectRepository(Suscripcion)
    private readonly suscripcionRepository: Repository<Suscripcion>
  ) {}

  /*  async create(
    createSuscripcionDto: CreateSuscripcionDto
  ): Promise<Suscripcion> {
    // Generar token único para la suscripción  
    const token = this.generateUniqueToken();

    const suscripcion = this.suscripcionRepository.create({
      ...createSuscripcionDto,
      token
    });

    return await this.suscripcionRepository.save(suscripcion);
  }*/

  async findAll(): Promise<Suscripcion[]> {
    return await this.suscripcionRepository.find({
      relations: ['company', 'plan'],
      order: { start_date: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Suscripcion> {
    const suscripcion = await this.suscripcionRepository.findOne({
      where: { id },
      relations: ['company', 'plan']
    });

    if (!suscripcion) {
      throw new Error('Suscripción no encontrada');
    }

    return suscripcion;
  }

  async update(
    id: string,
    updateSuscripcionDto: UpdateSuscripcionDto
  ): Promise<Suscripcion> {
    await this.suscripcionRepository.update(id, updateSuscripcionDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.suscripcionRepository.delete(id);
  }

  private generateUniqueToken(): string {
    return (
      'sub_' +
      Math.random().toString(36).substr(2, 9) +
      '_' +
      Date.now().toString(36)
    );
  }
}
