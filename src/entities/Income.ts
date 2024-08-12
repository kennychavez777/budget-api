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
  description: string;

  @Column()
  total: number;

  @Column()
  monthYear: string;

  @ManyToOne(() => User, (user) => user.incomes)
  user: User;

  @ManyToOne(() => WayToPay, (wtp) => wtp.incomes)
  @JoinColumn()
  wayToPay: WayToPay;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
