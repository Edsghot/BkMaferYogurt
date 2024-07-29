import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthValidateService } from './auth-validate.service';
import { from } from 'rxjs';

@Controller('/api/mailValidation')
export class AuthValidateController {
    constructor(private readonly authService: AuthValidateService){}


}
