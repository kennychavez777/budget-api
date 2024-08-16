import { Budget } from "../entities/Budget";

export interface IBudgetService {
  getAllBudgetsByUser(userId: number): any;
  getBudgetById(id: number): any;
  createBudget(budget: Budget): any;
  updateBudget(Budget: Budget): any;
  deleteBudget(id: number): any;
}
