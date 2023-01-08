import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity({ name: 'post_types' })
export class PostType {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany(
    () => Post,
    (post) => post.postType
  )
  posts: Post[];
}