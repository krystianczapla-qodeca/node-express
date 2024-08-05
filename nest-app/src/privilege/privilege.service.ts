import { Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrivilegeService {
  constructor(private prisma: PrismaService) { }

  create(createPrivilegeDto: CreatePrivilegeDto) {
    return this.prisma.privilege.create({ data: createPrivilegeDto });
  }

  findAll() {
    return this.prisma.privilege.findMany();
  }

  findOne(id: number) {
    return this.prisma.privilege.findUnique({ where: { id } });
  }

  update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
    return this.prisma.privilege.update({where: {id}, data: updatePrivilegeDto});
  }

  remove(id: number) {
    return this.prisma.privilege.delete({ where: { id } });
  }
}
