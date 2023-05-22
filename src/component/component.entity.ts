import { ComponentLibrary } from 'src/component-library/component-library.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column()
  componentName: string;

  @Column({
    type: 'text',
  })
  ComponentData: string;

  @ManyToOne(() => ComponentLibrary, (library) => library.components)
  libId: ComponentLibrary;

  @CreateDateColumn()
  createTime: string;

  @DeleteDateColumn()
  deleteTime: string;
}
