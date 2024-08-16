import { ExpenseDTO } from "./ExpenseDTO";
import { UserDTO } from "./UserDTO";

export class BudgeCreatetDTO {
  public id?: number;
  public title: string;
  public description: string;
  public isMain: boolean;
  public monthYear: string;
  public limit: number;
  public userId: number;
  public expenses: number[];
}
