import { Injectable } from '@nestjs/common';
import { CreateRolePrivilegeDto } from './dto/create-role-privilege.dto';
import { UpdateRolePrivilegeDto } from './dto/update-role-privilege.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolePrivilegeService {
  constructor(private prisma: PrismaService) {}

  create(createRolePrivilegeDto: CreateRolePrivilegeDto) {
    const { role_id, privilege_id } = createRolePrivilegeDto;
    return this.prisma.rolePrivilege.create({
      data: {
        role_id: role_id,
        privilege_id: privilege_id,
      },
    });
  }

  findAll() {
    return this.prisma.rolePrivilege.findMany({
      select: {
        id: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        privilege: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.rolePrivilege.findUnique({
      where: { id },
      select: {
        id: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        privilege: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.rolePrivilege.delete({ where: { id } });
  }

  deletePrivilegeFromRole(role_id: number, privilege_id: number) {
    this.prisma.rolePrivilege.findFirst({
      where: {
        role_id: role_id,
        privilege_id: privilege_id
      }
    }).then((rolePrivilege) => {
      return this.prisma.rolePrivilege.delete({where: { id: rolePrivilege.id }});
    }).catch((error) => {
      console.log(error);
    });
  }
}
