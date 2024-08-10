import { inject, injectable } from "inversify";
import { IncomeDTO } from "../dtos/IncomeDTO";
import { Income } from "../entities/Income";
import { IIncomeService } from "../interfaces/IIncomeService";
import { TYPES } from "../types";
import { IncomeRepository } from "../repositories/IncomeRepository";

@injectable()
export class IncomeService implements IIncomeService {
  private _incomeRepository: IncomeRepository;

  constructor(
    @inject(TYPES.IncomeRepository) incomeRepository: IncomeRepository
  ) {
    this._incomeRepository = incomeRepository;
  }

  public async getAllIncomesByUser(userId: number): Promise<Income[]> {
    return await this._incomeRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  public async getIncomeById(id: number) {
    throw new Error("Method not implemented.");
  }

  public async createIncome(income: IncomeDTO) {
    throw new Error("Method not implemented.");
  }

  public async editIncome(income: IncomeDTO) {
    throw new Error("Method not implemented.");
  }

  public async deleteIncome(id: number) {
    throw new Error("Method not implemented.");
  }
}
