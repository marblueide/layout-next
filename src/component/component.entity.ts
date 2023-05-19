import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Component{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  componentName: string;

  @Column({
    type: 'text'
  })
  ComponentData: string

  @Column()
  libId: string;

  @CreateDateColumn()
  createTime: string

  @DeleteDateColumn()
  deleteTime: string
}