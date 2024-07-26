import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { validate } from 'class-validator';
import { UserService } from './user.service';
import { CreateUserRequest } from './request/CreateUserRequest.request';
import { UpdateUserRequest } from './request/UpdateUserRequest.request';
import { LoginUserRequest } from './request/LoginUserRequest.request';
import { DateRangeDto } from './request/DateRangeDto.dto';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/insert')
    async insertUser(@Body() createUserDto: CreateUserRequest) {
        return await this.userService.insertUser(createUserDto);
    }

    @Put('/update')
    async updateUser(@Body() updateUserDto: UpdateUserRequest) {
        return await this.userService.updateUser(updateUserDto);
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get('/getById/:id')
    async getUserById(@Param('id') id: number) {
        return await this.userService.getUserById(id);
    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginUserRequest) {
        const errors = await validate(loginDto);
    
        if (errors.length > 0) {
            const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
        
            return {msg: "Error de datos de ingreso", detailMsg:errorMessage }
        }
        return await this.userService.login(loginDto.UserRequest, loginDto.Password);
    }

    @Get("/getUserByDateRange")
    async getUserByDateRange(@Body() request: DateRangeDto) {
      return await this.userService.getUserByDateRange(request);
    }

    @Get("/countUsersCliente")
    async countUsersCliente() {
      return await this.userService.countUsersCliente();
    }
}
