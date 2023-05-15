import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  groupName: string;

  @Column()
  rules: string;

  @Column({
    type: 'int',
  })
  status: number;

  @CreateDateColumn()
  createTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
