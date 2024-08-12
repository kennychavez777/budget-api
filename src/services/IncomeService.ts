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
    return await this._incomeRepository.findBy({ id: id })
  }

  public async createIncome(income: IncomeCreateDTO) {
    const user = await this._userRepository.findOne({ where: { id: parseInt(income.userId) }});

    if (!user) {
      throw new Error('No se encontró al usuario.');
    }

    const wtp = await this._wtpRepository.findOne({ where: { id: parseInt(income.wayToPayId) }})

    if (!wtp) {
      throw new Error('No se encontró la forma de pago.');
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

  public async editIncome(income: IncomeDTO) {
    throw new Error("Method not implemented.");
  }

  public async deleteIncome(id: number) {
    throw new Error("Method not implemented.");
  }
}
