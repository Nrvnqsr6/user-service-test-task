import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly name?: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    readonly password: string;
}
