import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) { }

  async create(createUserRoleDto: CreateUserRoleDto) {
    const newUserRole = createUserRoleDto;

    await this.prisma.userRole.create({
      data: newUserRole
    });
  }

  async findAll() {
    const usersRoles = await this.prisma.userRole.findMany({
      select: {
        role: true,
        user: true
      }
    });

    return usersRoles;
  }

  async findOne(id: number) {
    const usersRoles = await this.prisma.userRole.findFirst({
      select: {
        role: true,
        user: true
      }
    });

    return usersRoles;
  }

  deleteRoleFromUser(user_id: number, role_id: number) {
    this.prisma.userRole.findFirst({
      where: {
        user_id: user_id,
        role_id: role_id
      }
    }).then((userRole) => {
      return this.prisma.userRole.delete({where: { id: userRole.id }});
    }).catch((error) => {
      console.log(error);
    });
  }
}
