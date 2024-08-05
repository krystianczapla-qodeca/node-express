import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IsExist } from "src/validator/exist.validator";

export class CreateUserRoleDto {
    @IsNotEmpty()
    @IsNumber()
    @Validate(IsExist, ["user", "id"])
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Validate(IsExist, ["role", "id"])
    role_id: number;
}
