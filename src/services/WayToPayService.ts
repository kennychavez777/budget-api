import { injectable, inject } from "inversify";
import { IWayToPayService } from "../interfaces/IWayToPayService";
import { TYPES } from "../types";
import { WayToPayRepository } from "../repositories/WayToPayRepository";
import { WayToPay } from "../entities/WayToPay";

@injectable()
export class WayToPayService implements IWayToPayService {
  private wtpRepository: WayToPayRepository;

  constructor(@inject(TYPES.WayToPayRepository) wtpRepository: WayToPayRepository) {
    this.wtpRepository = wtpRepository;
  }

  public async getAllWayToPay(): Promise<WayToPay[]> {
    return await this.wtpRepository.find();
  }
}
