import { injectable, inject } from "inversify";
import { IWayToPayService } from "../interfaces/IWayToPayService";
import { TYPES } from "../types";
import { WayToPayRepository } from "../repositories/WayToPayRepository";
import { WayToPay } from "../entities/WayToPay";

@injectable()
export class WayToPayService implements IWayToPayService {
  private _wtpRepository: WayToPayRepository;

  constructor(@inject(TYPES.WayToPayRepository) wtpRepository: WayToPayRepository) {
    this._wtpRepository = wtpRepository;
  }

  public async getAllWayToPay(): Promise<WayToPay[]> {
    return await this._wtpRepository.find();
  }
}
