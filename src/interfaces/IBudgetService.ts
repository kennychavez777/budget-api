import { BudgetCreateDTO } from "../dtos/BudgetCreateDTO";

export interface IBudgetService {
  getAllBudgetsByUser(userId: number): any;
  getBudgetById(id: number): any;
  createBudget(budget: BudgetCreateDTO): any;
  updateBudget(Budget: BudgetCreateDTO): any;
  deleteBudget(id: number): any;
}
