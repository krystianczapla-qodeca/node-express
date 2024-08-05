import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsEnum, Validate } from "class-validator";
import { IsUnique } from "src/validator/unique.validator";
import { UserStatus } from "../constants/user-status";
import { UserType } from "../constants/user-type";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsUnique, ["user", "email"])
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @Validate(IsUnique, ["user", "phone"])
    phone: string;

    @IsNotEmpty()
    @IsEnum(UserStatus)
    status: UserStatus;

    @IsNotEmpty()
    @IsEnum(UserType)
    type: UserType;
}

