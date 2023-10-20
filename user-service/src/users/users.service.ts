import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const model = await this.userModel.findByPk(id);
        return (await model.update(updateUserDto)).save();
    }
}
