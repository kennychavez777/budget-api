import { injectable } from "inversify";
import { IExpenseService } from "../interfaces/IExpenseService";
import { ExpenseCreateDTO } from "../dtos/ExpenseCreateDTO";

@injectable()
export class ExpenseService implements IExpenseService {
  getAllExpensesByUser(userId: number) {
    throw new Error("Method not implemented.");
  }

  getBudgetById(id: number) {
    throw new Error("Method not implemented.");
  }

  getAllExpensesByBudget(budgetId: number) {
    throw new Error("Method not implemented.");
  }

  createBudget(budget: ExpenseCreateDTO) {
    throw new Error("Method not implemented.");
  }

  updateBudget(Budget: ExpenseCreateDTO) {
    throw new Error("Method not implemented.");
  }
  
  deleteBudget(id: number) {
    throw new Error("Method not implemented.");
  }
}
