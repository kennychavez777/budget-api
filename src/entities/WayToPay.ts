import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class WayToPay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
