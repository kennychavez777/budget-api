import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { WayToPay } from "./WayToPay";

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  total: number;

  @Column()
  month_year: string;

  @ManyToOne(() => User, (user) => user.incomes)
  user: User;

  @OneToOne(() => WayToPay)
  @JoinColumn()
  wayToPay: WayToPay;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
