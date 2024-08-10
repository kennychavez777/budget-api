import { controller, httpGet } from "inversify-express-utils";
import { IIncomeService } from "../interfaces/IIncomeService";
import { inject } from "inversify";
import { TYPES } from "../types";
import { Request, Response } from "express";

@controller("/incomes")
export class IncomeController {
  private _incomeService: IIncomeService;

  constructor(@inject(TYPES.IIncomeService) incomeService: IIncomeService) {
    this._incomeService = incomeService;
  }

  @httpGet("/:userId")
  public async getIncomeByUser(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).send({
        status: "Error",
        msg: "El id del usuario no existe",
      });
    }

    return this._incomeService.getAllIncomesByUser(parseInt(userId));
  }
}
