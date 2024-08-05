import { controller, httpGet, httpPost } from "inversify-express-utils";
import { ICategoryService } from "../interfaces/ICategoryService";
import { inject } from "inversify";
import { TYPES } from "../types";
import { CategoryDTO } from "../dtos/CategoryDTO";
import { Category } from '../entities/Category';

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
}
