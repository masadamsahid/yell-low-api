import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
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
      const existedUser = await this.userService.findOneByUsernameOrEmail({
        username: registerDto.username,
        email: registerDto.email,
      });
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
  login(@Body() loginDto: LoginDto) {
    console.log('login')
    return this.authService.login(loginDto);
  }
  
}
