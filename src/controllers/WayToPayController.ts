import { controller, httpGet } from "inversify-express-utils";
import { WayToPayService } from "../services/WayToPayService";
import { inject } from "inversify";
import { IWayToPayService } from "../interfaces/IWayToPayService";
import { TYPES } from "../types";
import { Request, Response } from "express";

@controller("/waytopay")
export class WayToPayController {
  private _wtpService: IWayToPayService;

  constructor(@inject(TYPES.IWayToPayService) wtpService: IWayToPayService) {
    this._wtpService = wtpService;
  }

  @httpGet('/')
  public async getUsers(req: Request, res: Response): Promise<void> {
    const users = await this._wtpService.getAllWayToPay();

    res.json(users);
  }
}
