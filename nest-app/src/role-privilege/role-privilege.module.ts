import { Module } from '@nestjs/common';
import { RolePrivilegeService } from './role-privilege.service';
import { RolePrivilegeController } from './role-privilege.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RolePrivilegeController],
  providers: [RolePrivilegeService],
  imports: [PrismaModule],
})
export class RolePrivilegeModule {}
