import { inject, injectable } from "inversify";
import { Budget } from "../entities/Budget";
import { IBudgetService } from "../interfaces/IBudgetService";
import { TYPES } from "../types";
import { BudgetRepository } from "../repositories/BudgetRepository";

@injectable()
export class BudgetService implements IBudgetService {
  private _budgetRepository: BudgetRepository;
  constructor(
    @inject(TYPES.BudgetRepository) budgetRepository: BudgetRepository
  ) {
    this._budgetRepository = budgetRepository;
  }

  public async getAllBudgetsByUser(userId: number) {
    return await this._budgetRepository
      .createQueryBuilder("budget")
      .innerJoinAndSelect("budget.users", "user", "user.id = :userId", { userId })
      .getMany();
  }

  public async getBudgetById(id: number) {
    return await this._budgetRepository.find({ where: { id: id } });
  }

  public async createBudget(budget: Budget) {}

  public async updateBudget(Budget: Budget) {
    throw new Error("Method not implemented.");
  }

  public async deleteBudget(id: number) {
    throw new Error("Method not implemented.");
  }
}
