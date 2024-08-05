import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { ICategoryService } from "../interfaces/ICategoryService";
import { inject } from "inversify";
import { TYPES } from "../types";
import { CategoryDTO } from "../dtos/CategoryDTO";
import { Category } from '../entities/Category';
import { Request, Response } from "express";

@controller("/category")
export class CategoryController {
  private _categoryService: ICategoryService;

  constructor(
    @inject(TYPES.ICategoryService) categoryService: ICategoryService
  ) {
    this._categoryService = categoryService;
  }

  @httpGet('/')
  public async getAllCategories(): Promise<Category[]> {
    return this._categoryService.getAllCategories();
  }

  @httpPost('/')
  public async createCategory(req: Request, res: Response) {
    const category: any = req.body ? req.body : { name: '', description: ''};
    
    return this._categoryService.createCategory(category);
  }

  @httpPut('/:id')
  public async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const data = { id, ...req.body };

    try {
      const category = await this._categoryService.updateCategory(data);
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      } else {
        res.status(400).send('Unknown error ocurred.')
      }
    }
  }
}
