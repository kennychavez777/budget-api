import { ExpenseCreateDTO } from "../dtos/ExpenseCreateDTO";

export interface IExpenseService {
  getAllExpensesByUser(userId: number): any;
  getBudgetById(id: number): any;
  getAllExpensesByBudget(budgetId: number): any;
  createBudget(budget: ExpenseCreateDTO): any;
  updateBudget(Budget: ExpenseCreateDTO): any;
  deleteBudget(id: number): any;
}
