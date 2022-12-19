import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }
  
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({ ...createUserDto });
    return this.userRepository.save(newUser);
  }
  
  findAll() {
    return this.userRepository.find();
  }
  
  findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  
  async findOneByUsernameOrEmail({ email, username } : { username: string, email: string }) {
    return await this.userRepository.findOne({
      where: [
        { username },
        { email },
      ]
    });
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException(
      'User not found',
      HttpStatus.BAD_REQUEST
    );
    return `This action updates a #${id} user`;
  }
  
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
