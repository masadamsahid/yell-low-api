import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from "express";
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from "./dto/login.dto";
import { RegisterDao } from "./dao/register.dao";
import { UserService } from "../user/user.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }
  
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ) {
    
    try {
      const existedUser = await this.userService.findOneByUsernameOrEmail(
        {
          username: registerDto.username,
          email: registerDto.email,
        }
      );
      if (existedUser) throw new HttpException(
        'Username already taken or email already registered',
        HttpStatus.BAD_REQUEST
      );
      
      const passwordHash = await bcrypt.hash(
        registerDto.password,
        Number(process.env.HASH_SALT_ROUNDS)
      );
      
      const fields: RegisterDao = {
        username: registerDto.username,
        email: registerDto.email,
        passwordHash,
        age: registerDto.age
      }
      
      return await this.authService.register(fields);
    } catch (err) {
      throw err;
    }
  }
  
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      const { access_token, refresh_token, user } = await this.authService.login(loginDto);
      
      res.cookie('access_token', access_token, { httpOnly: true });
      res.cookie('refresh_token', refresh_token, { httpOnly: true });
      
      res.status(HttpStatus.OK).send(user);
      return;
    } catch (err) {
      throw err;
    }
  }
  
}
