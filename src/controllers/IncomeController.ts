import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { IIncomeService } from "../interfaces/IIncomeService";
import { inject } from "inversify";
import { TYPES } from "../types";
import { Request, Response } from "express";
import { IncomeCreateDTO } from "../dtos/IncomeCreateDTO";

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

  @httpGet('/:id')
  public async getIncomeById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({
        status: "Error",
        msg: "El id del ingreso no existe."
      })
    }

    return this._incomeService.getIncomeById(parseInt(id));
  }

  @httpPost('/')
  public async createIncome(req: Request, res: Response) {
    const income: IncomeCreateDTO = req.body;

    return this._incomeService.createIncome(income);
  }

  @httpPut('/:id')
  public async updateIncome(req: Request, res: Response) {
    const { id } = req.params;
    let data = { id, ...req.body };

    try {
      const income = await this._incomeService.updateIncome(data);
      res.json(income);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      } else {
        res.status(400).send('Unknown error ocurred.')
      }
    }
  }

  @httpDelete('/:id')
  public async deleteUser(req: Request, res: Response) {
    if(!req.params.id) throw new Error('Error: El id del ingreso no ha sido encontrado.');

    const id = parseInt(req.params.id);

    try {
      await this._incomeService.deleteIncome(id);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send(error.message);
      } else {
        res.status(404).send('Unknown error ocurred.');
      }
    }

    res.status(200).send({
      status: 'success',
      msg: 'Ingreso eliminado correctamente.'
    });
  }
}
