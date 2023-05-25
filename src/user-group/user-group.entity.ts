import { Router } from 'src/router/router.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToMany(() => Router, (router) => router.userGroup)
  @JoinTable()
  router: Router[];

  @CreateDateColumn()
  createTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
