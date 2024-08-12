import { IncomeCreateDTO } from "../dtos/IncomeCreateDTO";
import { Income } from "../entities/Income";

export interface IIncomeService {
  getAllIncomesByUser(userId: number): Promise<Income[]>;
  getIncomeById(id: number): any;
  createIncome(income: IncomeCreateDTO): any;
  updateIncome(income: IncomeCreateDTO): any;
  deleteIncome(id: number): any;
}
