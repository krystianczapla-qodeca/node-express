import { Module } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { PrivilegeController } from './privilege.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PrivilegeController],
  providers: [PrivilegeService],
  imports: [PrismaModule],
})
export class PrivilegeModule {}
