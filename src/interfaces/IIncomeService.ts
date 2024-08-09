import { IncomeDTO } from "../dtos/IncomeDTO";

export interface IIncomeService {
  getAllIncomes(): any;
  getAllIncomesFromUser(userId: number): any;
  createIncome(income: IncomeDTO): any;
  editIncome(income: IncomeDTO): any;
  deleteIncome(id: number): any;
}
