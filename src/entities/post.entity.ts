import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { PostType } from "./post-type.entity";

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({})
  yell: string;
  
  @Column({ type: "text", nullable: true })
  imgUrl: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(
    () => User,
    (user) => user.posts
  )
  owner: User;
  
  @ManyToOne(
    () => PostType,
    (postType) => postType.posts
  )
  postType: PostType;
  
}