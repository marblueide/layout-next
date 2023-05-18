import { Page } from 'src/page/page.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  userGroupId: string;

  @CreateDateColumn()
  createTime: string;

  @DeleteDateColumn()
  deleteTime: string;

  @OneToMany(() => Page, (page) => page.user)
  pages: Page[];
}
