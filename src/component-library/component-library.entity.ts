import { Component } from 'src/component/component.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ComponentLibrary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  libName: string;

  @Column({
    default: ''
  })
  description?: string;

  @OneToMany(() => Component, (component) => component.libId)
  components: Component[];
 
  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
