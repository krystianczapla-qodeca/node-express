import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrivilegeModule } from './privilege/privilege.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { IsUnique } from './validator/unique.validator';
import { UserRoleModule } from './user-role/user-role.module';
import { RolePrivilegeModule } from './role-privilege/role-privilege.module';

@Module({
  imports: [UserModule, PrivilegeModule, PrivilegeModule, RoleModule, AuthModule, PrismaModule, UserRoleModule, RolePrivilegeModule],
  controllers: [AppController],
  providers: [AppService, IsUnique],
})
export class AppModule {}
