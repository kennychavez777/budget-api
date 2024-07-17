import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Expense } from "./Expense";

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isMain: boolean;

  @Column()
  month_year: string;

  @Column()
  limit: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Expense, (expense) => expense.budget)
  expenses: Expense[];
}
