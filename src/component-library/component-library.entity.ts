import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ComponentLibrary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  libName: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
