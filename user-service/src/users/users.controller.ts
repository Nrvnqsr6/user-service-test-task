// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly httpService: HttpService,
    ) {}

    @Post()
    create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.usersService
            .create(createUserDto)
            .then((user) => this.postToHistoryService(Actions.create, user.id));
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
        // return this.usersService.findAll().then((users) => {
        //     users.forEach((user) =>
        //         this.postToHistoryService(Actions.get, user.id),
        //     );
        // });
    }

    @Patch(':id')
    // eslint-disable-next-line prettier/prettier
    update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
        return this.usersService
            .update(+id, updateUserDto)
            .then((user) => this.postToHistoryService(Actions.update, user.id));
    }

    private async postToHistoryService(action_type: Actions, user_id: number) {
        const responseObserver = this.httpService.post<string>(
            'http://localhost:7000/actions',
            {
                action_type: action_type,
                user_id: user_id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );
        const response = await firstValueFrom(responseObserver);
        console.log(response.status);
        return response.data;
    }
}

enum Actions {
    create = 'Create',
    get = 'Get',
    update = 'Update',
}
