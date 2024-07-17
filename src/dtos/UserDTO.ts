import { BudgetDTO } from "./BudgetDTO";
import { IncomeDTO } from "./IncomeDTO";

export class UserDTO {
  public id: number;
  public firstname: string;
  public lastname: string;
  public nickname: string;
  public email: string;
  public password: string;
  public photo: string;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
  public incomes: IncomeDTO[];
  public budgets: BudgetDTO[];
}
