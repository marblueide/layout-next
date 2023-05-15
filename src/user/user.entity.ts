import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string

  @Column()
  password: string;

  @Column()
  userGroupId: string
  
  @CreateDateColumn()
  createTime: string

  @DeleteDateColumn()
  deleteTime: string
}