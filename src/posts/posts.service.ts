import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../db/entities/post.entity";
import { Repository } from "typeorm";
import { CreatePostDao } from "./dao/create-post.dao";

@Injectable()
export class PostsService {
  
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {
  }
  
  create(createPostDao: CreatePostDao) {
    const newUser = this.postRepository.create(createPostDao);
    return this.postRepository;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
