import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'user_roles' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @ManyToMany(
    () => User,
    (user) => user.roles
  )
  users: User[];
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
}
