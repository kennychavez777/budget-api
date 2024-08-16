import { controller, httpGet } from "inversify-express-utils";
import { IBudgetService } from "../interfaces/IBudgetService";
import { inject } from "inversify";
import { TYPES } from "../types";
import { Request, Response } from "express";

@controller("/budget")
export class BudgetController {
  private _budgetService: IBudgetService;

  constructor(@inject(TYPES.IBudgetService) budgetService: IBudgetService) {
    this._budgetService = budgetService;
  }

  @httpGet("/:id")
  public async getBudgetById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({
        status: "Error",
        msg: "El id del presupuesto no existe.",
      });
    }

    console.log('id ', id)
    return this._budgetService.getBudgetById(parseInt(id));
  }

  @httpGet("/:userId")
  public async getBudgetByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).send({
        status: "Error",
        msg: "El id del usuario no existe.",
      });
    }

    console.log('id ', userId)
    return this._budgetService.getAllBudgetsByUser(parseInt(userId));
  }
}
