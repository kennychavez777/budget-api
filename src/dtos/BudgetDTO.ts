import { ExpenseDTO } from "./ExpenseDTO";
import { UserDTO } from "./UserDTO";

export class BudgetDTO {
  public id: number;
  public title: string;
  public description: string;
  public isMain: boolean;
  public monthYear: string;
  public limit: number;
  public ownerId: UserDTO;
  public expenses: ExpenseDTO[];
  public createdAt: Date;
  public updatedAt: Date;
}
