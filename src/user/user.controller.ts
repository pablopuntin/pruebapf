import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req
 } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Request } from '@nestjs/common';

//refactor multi-tenant
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



@Post()
async create(@Body() dto: CreateUserDto, @Req() req: any) {
  const authUser = req.user;
  return this.userService.create(dto, authUser);
}


  @Get()
  async findAll(@Req() req: any): Promise<User[]> {
    return this.userService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.userService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: any) {
    return this.userService.update(id, dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.userService.remove(id, req.user);
  }
}
