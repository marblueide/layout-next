import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PageLibrary {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  pageName: string;

  @Column()
  router: string;

  @Column()
  userId: string;

  @Column({
    type: 'text',
  })
  pageData: string;

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
