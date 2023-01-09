import { Module } from '@nestjs/common';
import { PostTypesService } from './post-types.service';
import { PostTypesController } from './post-types.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostType } from "../db/entities/post-type.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostType])
  ],
  controllers: [PostTypesController],
  providers: [PostTypesService]
})
export class PostTypesModule {}
