import { IsBoolean, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsUnique } from "src/validator/unique.validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @Validate(IsUnique, ["role", "name"])
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    blocked: boolean = false;
}
