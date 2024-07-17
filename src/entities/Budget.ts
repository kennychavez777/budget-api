import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
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
  monthYear: string;

  @Column()
  limit: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Expense, (expense) => expense.budget)
  expenses: Expense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
