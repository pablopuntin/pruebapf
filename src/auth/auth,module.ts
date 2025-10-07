import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { Company } from 'src/empresa/entities/empresa.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, Rol]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretkey', // usa variable de entorno
      signOptions: { expiresIn: '15m' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
