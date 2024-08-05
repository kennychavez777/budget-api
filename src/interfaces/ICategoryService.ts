import { CategoryDTO } from "../dtos/CategoryDTO";

export interface ICategoryService {
  getAllCategories(): any;
  createCategory({ name, description }: CategoryDTO): any;
  // deleteCategory(): any;
  // updateCategory(): any;
}
