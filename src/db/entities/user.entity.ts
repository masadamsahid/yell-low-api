import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { UserRole } from "./user-role.entity";

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
  
  @ManyToMany(
    () => UserRole,
    (userRole) => userRole.users
  )
  @JoinTable({ name: 'user_to_user_role' })
  roles: UserRole[];
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}
