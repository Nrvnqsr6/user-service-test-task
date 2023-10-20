import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    readonly email?: string;

    @IsString()
    readonly name?: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    readonly password?: string;
}
