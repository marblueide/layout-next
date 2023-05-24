import { Page } from 'src/page/page.entity';
import { UserGroup } from 'src/user-group/user-group.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => UserGroup, (userGourp) => userGourp.users, {
    nullable: true,
  })
  userGroup: UserGroup;

  @CreateDateColumn()
  createTime: string;

  @DeleteDateColumn()
  deleteTime: string;

  @OneToMany(() => Page, (page) => page.user, {
    cascade: true,
  })
  pages: Page[];
}
