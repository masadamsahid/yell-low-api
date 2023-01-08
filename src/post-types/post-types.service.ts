import { Injectable } from '@nestjs/common';
import { CreatePostTypeDto } from './dto/create-post-type.dto';
import { UpdatePostTypeDto } from './dto/update-post-type.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { PostType } from "../entities/post-type.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostTypesService {
  constructor(@InjectRepository(PostType) private postTypeRepository: Repository<PostType>) {
  }
  
  create(createPostTypeDto: CreatePostTypeDto) {
    return 'This action adds a new postType';
  }

  findAll() {
    return `This action returns all postTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postType`;
  }

  update(id: number, updatePostTypeDto: UpdatePostTypeDto) {
    return `This action updates a #${id} postType`;
  }

  remove(id: number) {
    return `This action removes a #${id} postType`;
  }
}
