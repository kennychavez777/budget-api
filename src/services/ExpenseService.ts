import { inject, injectable } from "inversify";
import { IExpenseService } from "../interfaces/IExpenseService";
import { ExpenseCreateDTO } from "../dtos/ExpenseCreateDTO";
import { ExpenseRepository } from "../repositories/ExpenseRepository";
import { TYPES } from "../types";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { WayToPayRepository } from "../repositories/WayToPayRepository";
import { BudgetRepository } from "../repositories/BudgetRepository";
import { Expense } from "../entities/Expense";

@injectable()
export class ExpenseService implements IExpenseService {
  private _expenseRepository: ExpenseRepository;
  private _categoryRepository: CategoryRepository;
  private _wtpRepository: WayToPayRepository;
  private _budgetRepository: BudgetRepository;

  constructor(
    @inject(TYPES.ExpenseRepository) expenseRepository: ExpenseRepository,
    @inject(TYPES.CategoryRepository) categoryRepository: CategoryRepository,
    @inject(TYPES.WayToPayRepository) wtpRepository: WayToPayRepository,
    @inject(TYPES.BudgetRepository) budgetRepository: BudgetRepository
  ) {
    this._expenseRepository = expenseRepository;
    this._categoryRepository = categoryRepository;
    this._wtpRepository = wtpRepository;
    this._budgetRepository = budgetRepository;
  }

  public async getAllExpensesByUser(userId: number) {
    return await this._expenseRepository
      .createQueryBuilder("expense")
      .innerJoinAndSelect(
        "expense.budget",
        "budget",
        "budget.ownerId = :userId",
        { userId }
      )
      .getMany();
  }

  public async getBudgetById(id: number) {
    return await this._expenseRepository.find({ where: { id: id } });
  }

  public async getAllExpensesByBudget(budgetId: number) {
    return await this._expenseRepository
      .createQueryBuilder("expense")
      .innerJoinAndSelect(
        "expense.budgets",
        "budget",
        "budget.id = :budgetId",
        {
          budgetId,
        }
      )
      .getMany();
  }

  public async createBudget(data: ExpenseCreateDTO) {
    const category = await this._categoryRepository.findOne({
      where: {
        id: data.categoryId,
      },
    });

    const wayToPay = await this._wtpRepository.findOne({
      where: {
        id: data.wayToPayId,
      },
    });

    const budget = await this._budgetRepository.findOne({
      where: {
        id: data.budgetId,
      },
    });

    if (!category) throw new Error("No existe la categoria seleccionada.");
    if (!wayToPay) throw new Error("No existe la forma de pago seleccionada.");
    if (!budget) throw new Error("No existe el presupuesto seleccionado.");

    const newExpense = new Expense();
    newExpense.name = data.name;
    newExpense.description = data.description;
    newExpense.photo = data.photo;
    newExpense.category = category;
    newExpense.wayToPay = wayToPay;
    newExpense.budget = budget;

    return this._expenseRepository.save(newExpense);
  }

  public async updateBudget(data: ExpenseCreateDTO) {
    const updatedExpense = await this._expenseRepository.findOne({
      where: { id: data.id },
    });

    const category = await this._categoryRepository.findOne({
      where: {
        id: data.categoryId,
      },
    });

    const wayToPay = await this._wtpRepository.findOne({
      where: {
        id: data.wayToPayId,
      },
    });

    const budget = await this._budgetRepository.findOne({
      where: {
        id: data.budgetId,
      },
    });

    if (!updatedExpense) throw new Error("No existe el gasto seleccionado.");
    if (!category) throw new Error("No existe la categoria seleccionada.");
    if (!wayToPay) throw new Error("No existe la forma de pago seleccionada.");
    if (!budget) throw new Error("No existe el presupuesto seleccionado.");

    updatedExpense.name = data.name;
    updatedExpense.description = data.description;
    updatedExpense.photo = data.photo;
    updatedExpense.category = category;
    updatedExpense.wayToPay = wayToPay;
    updatedExpense.budget = budget;

    return this._expenseRepository.save(updatedExpense);
  }

  public async deleteBudget(id: number) {
    if (!id) throw new Error("No se encontró el ID del presupuesto.");

    return await this._expenseRepository.delete(id);
  }
}
