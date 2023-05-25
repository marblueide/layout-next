import { UserGroup } from 'src/user-group/user-group.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Router {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @ManyToMany(() => UserGroup, (userGroup) => userGroup.routes)
  userGroup: UserGroup[];

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
