import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolePrivilegeService } from './role-privilege.service';
import { CreateRolePrivilegeDto } from './dto/create-role-privilege.dto';
import { UpdateRolePrivilegeDto } from './dto/update-role-privilege.dto';

@Controller('role-privilege')
export class RolePrivilegeController {
  constructor(private readonly rolePrivilegeService: RolePrivilegeService) {}

  @Post()
  create(@Body() createRolePrivilegeDto: CreateRolePrivilegeDto) {
    return this.rolePrivilegeService.create(createRolePrivilegeDto);
  }

  @Get()
  findAll() {
    return this.rolePrivilegeService.findAll(); //+ names
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolePrivilegeService.findOne(+id); // id, name 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolePrivilegeService.remove(+id);
  }

  @Delete(':role_id/:privilege_id')
  deleteRoleFromUser(@Param('role_id') role_id: string, @Param('privilege_id') privilege_id: string) {
    return this.rolePrivilegeService.deletePrivilegeFromRole(+role_id, +privilege_id);
  }

  // role with assigned privileges (GET /role-privilege/role-with-privileges/:id)

  // add privilege to role (POST /role-privilege/add-privilege-to-role)
}
