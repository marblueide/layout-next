import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  groupName: string;

  @Column({
    default: '',
  })
  rules: string;

  @Column({
    type: 'int',
    default: 1,
  })
  status: number;

  @OneToMany(() => User, (user) => user.userGroup, {
    cascade: true,
    nullable: true,
  })
  users: User[];

  @CreateDateColumn()
  createTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
