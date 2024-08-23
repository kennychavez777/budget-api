import { inject, injectable } from "inversify";
import { IBudgetService } from "../interfaces/IBudgetService";
import { TYPES } from "../types";
import { BudgetRepository } from "../repositories/BudgetRepository";
import { BudgetCreateDTO } from "../dtos/BudgetCreateDTO";
import { UserRepository } from "../repositories/UserRepository";
import { In } from "typeorm";
import { User } from "../entities/User";
import { Budget } from "../entities/Budget";

@injectable()
export class BudgetService implements IBudgetService {
  private _budgetRepository: BudgetRepository;
  private _userRepository: UserRepository;

  constructor(
    @inject(TYPES.BudgetRepository) budgetRepository: BudgetRepository,
    @inject(TYPES.UserRepository) userRepository: UserRepository
  ) {
    this._budgetRepository = budgetRepository;
    this._userRepository = userRepository;
  }

  public async getAllBudgetsByUser(userId: number) {
    return await this._budgetRepository
      .createQueryBuilder("budget")
      .innerJoinAndSelect("budget.users", "user", "user.id = :userId", {
        userId,
      })
      .getMany();
  }

  public async getBudgetById(id: number) {
    return await this._budgetRepository.find({ where: { id: id } });
  }

  public async createBudget(budget: BudgetCreateDTO) {
    let sharedUsers: User[] = [];

    if (budget.users.length > 0) {
      sharedUsers = await this._userRepository.find({
        where: {
          id: In(budget.users),
        },
      });
    }

    const owner = await this._userRepository.findOne({
      where: {
        id: budget.ownerId,
      },
    });

    if (!owner) throw new Error('No existe el usuario dueño.');

    const newBudget = new Budget();
    newBudget.title = budget.title;
    newBudget.description = budget.description;
    newBudget.isMain = budget.isMain;
    newBudget.monthYear = budget.monthYear;
    newBudget.limit = budget.limit;
    newBudget.owner = owner;
    newBudget.users = sharedUsers;

    return await this._budgetRepository.save(newBudget);
  }

  public async updateBudget(budget: BudgetCreateDTO) {
    const updatedBudget = await this._budgetRepository.findOne({ where: { id: budget.id}});
    let sharedUsers: User[] = [];

    if (budget.users.length > 0) {
      sharedUsers = await this._userRepository.find({
        where: {
          id: In(budget.users),
        },
      });
    }

    const owner = await this._userRepository.findOne({
      where: {
        id: budget.ownerId,
      },
    });

    if (!owner) throw new Error('No se encontró el dueño del presupuesto.');

    if (!updatedBudget) throw new Error('No se encontro el presupuesto.');
    
    updatedBudget.title = budget.title;
    updatedBudget.description = budget.description;
    updatedBudget.isMain = budget.isMain;
    updatedBudget.monthYear = budget.monthYear;
    updatedBudget.limit = budget.limit;
    updatedBudget.owner = owner;
    updatedBudget.users = sharedUsers;

    return await this._budgetRepository.save(updatedBudget);
  }

  public async deleteBudget(id: number) {
    if (!id) throw new Error("No se encontró el ID del presupuesto.");

    return await this._budgetRepository.delete(id);
  }
}
