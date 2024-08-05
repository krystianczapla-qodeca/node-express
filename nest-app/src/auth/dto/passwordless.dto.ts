import { IsEmail } from 'class-validator';

export class PasswordlessDto {
    @IsEmail()
    destination: string;
}