import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseConfig = TypeOrmModule.forRoot({
  type: 'postgres',

  // Si existe DATABASE_URL (Render) se usa directamente, si no se toman variables separadas (local)
  url: process.env.DATABASE_URL || undefined,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // SSL necesario en Render
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false,

  autoLoadEntities: true,
  synchronize: true // cuidado en producción: mejor false
});
