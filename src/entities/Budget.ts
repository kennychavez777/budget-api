import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
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
  
  @ManyToOne(() => User, (user) => user.budgets)
  owner: User;

  @OneToMany(() => Expense, (expense) => expense.budget)
  expenses: Expense[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
