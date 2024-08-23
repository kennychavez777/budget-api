import { inject, injectable } from "inversify";
import { IncomeDTO } from "../dtos/IncomeDTO";
import { Income } from "../entities/Income";
import { IIncomeService } from "../interfaces/IIncomeService";
import { TYPES } from "../types";
import { IncomeRepository } from "../repositories/IncomeRepository";
import { UserRepository } from "../repositories/UserRepository";
import { IncomeCreateDTO } from "../dtos/IncomeCreateDTO";
import { WayToPayRepository } from "../repositories/WayToPayRepository";

@injectable()
export class IncomeService implements IIncomeService {
  private _incomeRepository: IncomeRepository;
  private _userRepository: UserRepository;
  private _wtpRepository: WayToPayRepository;

  constructor(
    @inject(TYPES.IncomeRepository) incomeRepository: IncomeRepository,
    @inject(TYPES.UserRepository) userRepository: UserRepository,
    @inject(TYPES.WayToPayRepository) wayToPayRepository: WayToPayRepository
  ) {
    this._incomeRepository = incomeRepository;
    this._userRepository = userRepository;
    this._wtpRepository = wayToPayRepository;
  }

  public async getAllIncomesByUser(userId: number): Promise<Income[]> {
    return await this._incomeRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  public async getIncomeById(id: number) {
    return await this._incomeRepository.findBy({ id: id });
  }

  public async createIncome(income: IncomeCreateDTO) {
    const user = await this._userRepository.findOne({
      where: { id: parseInt(income.userId) },
    });

    if (!user) {
      throw new Error("No se encontró al usuario.");
    }

    const wtp = await this._wtpRepository.findOne({
      where: { id: parseInt(income.wayToPayId) },
    });

    if (!wtp) {
      throw new Error("No se encontró la forma de pago.");
    }

    const newIncome = new Income();
    newIncome.title = income.title;
    newIncome.description = income.description;
    newIncome.total = income.total;
    newIncome.monthYear = income.monthYear;
    newIncome.user = user;
    newIncome.wayToPay = wtp;

    return await this._incomeRepository.save(newIncome);
  }

  public async updateIncome(data: IncomeCreateDTO) {
    const income = await this._incomeRepository.findOne({
      where: { id: data.id },
    });

    const user = await this._userRepository.findOne({
      where: { id: parseInt(data.userId) },
    });
    
    const wtp = await this._wtpRepository.findOne({
      where: { id: parseInt(data.wayToPayId) },
    });

    if (!user) throw new Error("No se encontró el usuario.");

    if (!income) throw new Error("No se encontró el ingreso.");

    if (!wtp) throw new Error("No se encontró la forma de pago.");

    income.title = data.title;
    income.description = data.description;
    income.total = data.total;
    income.monthYear = data.monthYear;
    income.user = user;
    income.wayToPay = wtp;

    return await this._incomeRepository.save(income);
  }

  public async deleteIncome(id: number) {
    if (!id) throw new Error("No se encontró el ID del ingreso.");

    return await this._incomeRepository.delete(id);
  }
}
