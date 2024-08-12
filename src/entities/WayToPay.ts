import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Income } from "./Income";

@Entity()
export class WayToPay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Income, (income) => income.wayToPay)
  incomes: Income[];
}
