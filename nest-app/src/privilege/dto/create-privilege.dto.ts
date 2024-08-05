import { IsString, IsNotEmpty, IsEnum, Validate, IsNumber } from "class-validator";
import { PrivilegeType } from "../constants/privilege-type";
import { IsUnique } from "src/validator/unique.validator";

export class CreatePrivilegeDto {
    @IsString()
    @IsNotEmpty()
    @Validate(IsUnique, ["privilege", "name"])
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(PrivilegeType)
    type: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    privilege_group_id: number = 1;
}
