// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: config.get<string>('DATABASE_URL') || undefined,
  host: config.get<string>('DB_HOST'),
  port: config.get<number>('DB_PORT') || 5432,
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),
  ssl: config.get('DATABASE_URL') ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: true // ⚠️ Nunca usar true en producción
});
