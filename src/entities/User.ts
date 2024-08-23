import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Income } from "./Income";
import { Budget } from "./Budget";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    nullable: true
  })
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  photo: string;

  @Column({
    nullable: true
  })
  description: string;

  @CreateDateColumn({
    nullable: true
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt: Date;

  //
  @OneToMany(() => Income, (income) => income.user)
  incomes: Income[];

  @OneToMany(() => Budget, (budget) => budget.owner)
  budgets: Budget[];
}
