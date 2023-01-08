import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  username: string;
  
  @Column({ unique: true })
  email: string;
  
  @Column({ select: false })
  passwordHash: string;
  
  @Column({ nullable: true })
  refreshToken: string;
  
  @Column()
  age: number;
  
  @OneToMany(
    () => Post,
    (post) => post.owner
  )
  posts: Post[];
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}
