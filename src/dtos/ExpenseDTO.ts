import { BudgetDTO } from "./BudgetDTO";
import { CategoryDTO } from "./CategoryDTO";
import { WayToPayDTO } from "./WayToPayDTO";

export class ExpenseDTO {
  public id: number;
  public name: string;
  public description: string;
  public photo: string;
  public category: CategoryDTO;
  public wayToPay: WayToPayDTO;
  public budget: BudgetDTO;
  public createdAt: Date;
  public updatedAt: Date;
}
