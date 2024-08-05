import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IsExist } from "src/validator/exist.validator";

export class CreateRolePrivilegeDto {
    @IsNotEmpty()
    @IsNumber()
    @Validate(IsExist, ["role", "id"])
    role_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Validate(IsExist, ["privilege", "id"])
    privilege_id: number;
  }