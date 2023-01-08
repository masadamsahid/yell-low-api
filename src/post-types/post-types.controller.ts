import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostTypesService } from './post-types.service';
import { CreatePostTypeDto } from './dto/create-post-type.dto';
import { UpdatePostTypeDto } from './dto/update-post-type.dto';

@Controller('post-types')
export class PostTypesController {
  constructor(private readonly postTypesService: PostTypesService) {}

  @Post()
  create(@Body() createPostTypeDto: CreatePostTypeDto) {
    return this.postTypesService.create(createPostTypeDto);
  }

  @Get()
  findAll() {
    return this.postTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostTypeDto: UpdatePostTypeDto) {
    return this.postTypesService.update(+id, updatePostTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postTypesService.remove(+id);
  }
}
