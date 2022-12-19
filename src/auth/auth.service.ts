import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDao } from "./dao/register.dao";
import { LoginDao } from "./dao/login.dao";
import { UserService } from "../user/user.service";

type ObjectWildCards<T> = T & { [key: string]: unknown };

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService
  ) {
  }
  
  private async generateJWT(
    payload: ObjectWildCards<object>,
    jwtSecret: string,
    expiresIn: string
  ) {
    return await jwt.sign(
      { data: { ...payload } },
      jwtSecret,
      { expiresIn }
    );
  }
  
  private async generateAccessToken(payload: ObjectWildCards<object>) {
    console.log(process.env.ACCESS_TOKEN_SECRET)
    return await this.generateJWT(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXP || '1h'
    );
  }
  
  private async generateRefreshToken(payload: ObjectWildCards<object>) {
    console.log(process.env.REFRESH_TOKEN_SECRET)
    return await this.generateJWT(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXP || '3h'
    );
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
    const user = await this.userService.findOneByUsernameOrEmail(
      {
        username: loginDao.usernameEmail,
        email: loginDao.usernameEmail
      },
      {
        passwordHash: true
      }
    );
    if (!user) throw new HttpException(
      'Wrong credentials',
      HttpStatus.FORBIDDEN
    );
    
    const compareResult = await bcrypt.compare(loginDao.password, user.passwordHash);
    if (!compareResult) throw new HttpException(
      'Wrong credentials',
      HttpStatus.FORBIDDEN
    );
    delete user.passwordHash;
    
    const access_token = await this.generateAccessToken({ ...user });
    const refresh_token = await this.generateRefreshToken({ id: user.id });
    
    return {access_token, refresh_token, user};
  }
}
