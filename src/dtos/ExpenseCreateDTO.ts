export class ExpenseCreateDTO {
  public id?: number;
  public name: string;
  public description: string;
  public photo: string;
  public categoryId: number;
  public wayToPayId: number;
  public budgetId: number;
  public createdAt: Date;
  public updatedAt: Date;
}
