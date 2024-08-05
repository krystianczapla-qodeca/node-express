import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsEnum, Validate, IsNumber } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivilegeDto } from './create-privilege.dto';

export class UpdatePrivilegeDto extends PartialType(CreatePrivilegeDto) { }