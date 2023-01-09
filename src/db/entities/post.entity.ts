import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
  @JoinColumn({ name: 'owner_id' })
  owner: User;
  
  @ManyToOne(
    () => PostType,
    (postType) => postType.posts
  )
  @JoinColumn({ name: 'post_type_id' })
  postType: PostType;
  
}