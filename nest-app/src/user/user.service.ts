import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserStatus } from './constants/user-status';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create(createUserDto: CreateUserDto) {
    const newUser = createUserDto;

    this.prisma.user.create({ data: newUser }).then((user) => {
      console.log(`Created user with id: ${user.id}`);
    }).catch((error) => {
      console.log(error);
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return 'userUpdated';
  }

  remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { status: UserStatus.DELETED },
    });
  }

  block(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { status: UserStatus.BLOCKED },
    });
  }

  unblock(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { status: UserStatus.ACTIVE },
    });
  }
}