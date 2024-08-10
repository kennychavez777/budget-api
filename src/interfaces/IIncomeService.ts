import { IncomeDTO } from "../dtos/IncomeDTO";
import { Income } from "../entities/Income";

export interface IIncomeService {
  getAllIncomesByUser(userId: number): Promise<Income[]>;
  getIncomeById(id: number): any;
  createIncome(income: IncomeDTO): any;
  editIncome(income: IncomeDTO): any;
  deleteIncome(id: number): any;
}
