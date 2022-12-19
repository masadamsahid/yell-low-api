import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDao } from "./dao/register.dao";
import { LoginDao } from "./dao/login.dao";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService
  ) {
  }
  
  async register(registerDao: RegisterDao) {
    try {
      const newUser = await this.userRepository.create({ ...registerDao });
      
      const savedUser = await this.userRepository.save(newUser);
      delete savedUser.passwordHash;
      return savedUser;
    } catch (err) {
      throw err;
    }
  }
  
  async login(loginDao: LoginDao) {
    const user = await this.userService.findOneByUsernameOrEmail({
      username: loginDao.usernameEmail,
      email: loginDao.usernameEmail,
    });
    if (!user) throw new HttpException(
      'Wrong credentials',
      HttpStatus.FORBIDDEN
    );
    
    const compareResult = await bcrypt.compare(loginDao.password, user.passwordHash);
    if (!compareResult) throw new HttpException(
      'Wrong credentials',
      HttpStatus.FORBIDDEN
    );
    
    const access_token = await jwt.sign(
      { data: {} }
    );
    
    return;
  }
}
