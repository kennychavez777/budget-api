import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Category } from "./Category";
import { WayToPay } from "./WayToPay";
import { Budget } from "./Budget";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  photo: string;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToOne(() => WayToPay)
  @JoinColumn()
  wayToPay: WayToPay;

  @ManyToOne(() => Budget, (budget) => budget.expenses)
  budget: Budget;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
