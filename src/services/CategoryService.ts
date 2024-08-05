import { inject, injectable } from "inversify";
import { ICategoryService } from "../interfaces/ICategoryService";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { TYPES } from "../types";
import { Category } from "../entities/Category";
import { CategoryDTO } from "../dtos/CategoryDTO";

@injectable()
export class CategoryService implements ICategoryService{
  private _categoryRepository: CategoryRepository;

  constructor(
    @inject(TYPES.CategoryRepository) categoryRepository: CategoryRepository
  ) {
    this._categoryRepository = categoryRepository;
  }

  public async getAllCategories(): Promise<Category[]> {
    return await this._categoryRepository.find();
  }

  public async createCategory({ name, description } : CategoryDTO) {
    const category = new Category();
    category.name = name;
    category.description = description ? description : '';
    console.log(name, description);

    return await this._categoryRepository.save(category);
  }
}
