import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { IBudgetService } from "../interfaces/IBudgetService";
import { inject } from "inversify";
import { TYPES } from "../types";
import { Request, Response } from "express";
import { BudgetCreateDTO } from "../dtos/BudgetCreateDTO";

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

    console.log("id ", id);
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

    console.log("id ", userId);
    return this._budgetService.getAllBudgetsByUser(parseInt(userId));
  }

  @httpPost("/")
  public async createBudget(req: Request, res: Response) {
    const budget: BudgetCreateDTO = req.body;

    return this._budgetService.createBudget(budget);
  }

  @httpPut("/:id")
  public async updateBudget(req: Request, res: Response) {
    const { id } = req.params;
    const data = { id, ...req.body };

    try {
      const budget = await this._budgetService.updateBudget(data);
      res.json(budget);
    } catch(error) {
      if (error instanceof Error) {
        res.status(404).send(error.message);
      } else {
        res.status(404).send('Unknown error ocurred.');
      }
    }
  }

  @httpDelete('/:id')
  public async deleteBudget(req: Request, res: Response) {
    if(!req.params.id) throw new Error('Error: El id del ingreso no ha sido encontrado.');

    const id = parseInt(req.params.id);

    try {
      await this._budgetService.deleteBudget(id);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send(error.message);
      } else {
        res.status(404).send('Unknown error ocurred.');
      }
    }

    res.status(200).send({
      status: 'success',
      msg: 'Presupuesto eliminado correctamente.'
    });
  }
}
