import { CategoryDTO } from "../dtos/CategoryDTO";

export interface ICategoryService {
  getAllCategories(): any;
  createCategory({ name, description }: CategoryDTO): any;
  updateCategory({ id, name, description}: CategoryDTO): any;
  deleteCategory(id : number): any;
}
