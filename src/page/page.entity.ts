import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  pageName: string;

  @Column({
    default: '',
  })
  router: string;

  @ManyToOne(() => User, (user) => user.pages)
  user: User;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  pageData: string;

  @Column({
    default: '',
  })
  describe: string;

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
