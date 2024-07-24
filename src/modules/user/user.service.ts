import { Injectable } from '@nestjs/common';
import {CreateUserRequest} from './request/CreateUserRequest.request'
import {UpdateUserRequest} from './request/UpdateUserRequest.request'
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateService } from 'src/Common/Validate/validate.service';
import { Repository } from 'typeorm';
import { User } from './entity/UserEntity.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private validateService: ValidateService,
      ) {
      }
    

  async insertUser(request: CreateUserRequest) {
    try {
      let band: { success: boolean, msg: string };
      band = await this.validateService.validateDni(request.Dni);
      
      if (!band.success) {
        return { msg: band.msg, success: band.success, data: null };
      }
  
      band = await this.validateService.validatePhoneNumber(request.Phone);
      
      if (!band.success) {
        return { msg: band.msg, success: band.success, data: null };
      }
  
      band = await this.validateService.validateFirstName(request.FirstName);
      
      if (!band.success) {
        return { msg: band.msg, success: band.success, data: null };
      }
  
      band = await this.validateService.validateLastName(request.LastName);
  
      if (!band.success) {
        return { msg: band.msg, success: band.success, data: null };
      }
  
      const userDni = await this.userRepository.findOne({ where: { Dni: request.Dni } });
  
      if (userDni) {
        return { msg: "Ya se registró un usuario con ese DNI", success: false, data: null };
      }
  
      const newUser = this.userRepository.create({
        FirstName: request.FirstName,
        LastName: request.LastName,
        Password: request.Password,
        BirthDate: request.BirthDate,
        Phone: request.Phone,
        Dni: request.Dni,
        Mail: request.Mail,
        Rol: request.Rol,
        Address: request.Address
      });
  
      // Guardar la nueva entidad de usuario en la base de datos
      await this.userRepository.save(newUser);
  
      return { msg: 'Usuario insertado correctament', success: true}

    }catch(e){
        return {msg: "Error al insertar usuario",success: true,smsDetail: e.msg}
    }
}
      
  async updateUser(updateUserDto: UpdateUserRequest) {
    try {
      const user = await this.userRepository.findOne({
        where: { IdUser: updateUserDto.IdUser },
      });
      if (!user) {
        return { msg: 'Usuario no encontrado', success: false };
      }
  
      user.FirstName = updateUserDto.FirstName;
      user.LastName = updateUserDto.LastName;
      user.Password = updateUserDto.Password;
      user.Phone = updateUserDto.Phone;
      user.BirthDate = updateUserDto.BirthDate;
      user.Dni = updateUserDto.Dni;
      user.Address = updateUserDto.Address;
      user.Mail = updateUserDto.Mail;
      user.Rol = updateUserDto.Rol;
  
      await this.userRepository.save(user);
  
      return { msg: 'Usuario actualizado exitosamente', success: true };
    } catch (error) {
      return { msg: 'Error al actualizar usuario', detailMsg: error, success: false };
    }
  }
  
  async getAllUsers() {
    try {
      const users = await this.userRepository.find();
      return { data: users, msg: 'Éxito', success: true };
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return { msg: 'Error al obtener usuarios', detailMsg: error, success: false };
    }
  }
  
  async deleteUser(userId: number) {
    try {
      await this.userRepository.delete(userId);
      return { msg: 'Usuario eliminado exitosamente', success: true };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return { msg: 'Error al eliminar usuario', detailMsg: error, success: false };
    }
  }
  
  async getUserById(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { IdUser: userId },
      });
      return { data: user, msg: 'Éxito', success: true };
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      return { msg: 'Error al obtener usuario', detailMsg: error, success: false };
    }
  }
  
  async login(userRequest: string, password: string) {
    try {
      let userRes;
      userRes = await this.userRepository.findOne({
        where: { Mail: userRequest, Password: password },
      });
  
      if (!userRes) {
        userRes = await this.userRepository.findOne({
          where: { Dni: userRequest, Password: password },
        });
  
        if (!userRes) {
          return {
            data: null,
            msg: 'Usuario o contraseña incorrectos',
            success: false,
          };
        }
      }
  
      return { data: userRes, msg: 'Éxito', success: true };
    } catch (error) {
      return { msg: 'Error al iniciar sesión', detailMsg: error, success: false };
    }
  }
  
}

