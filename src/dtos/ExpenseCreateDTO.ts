export class ExpenseCreateDTO {
  public id?: number;
  public name: string;
  public description: string;
  public photo: string;
  public category: number;
  public wayToPay: number;
  public budget: number;
  public createdAt: Date;
  public updatedAt: Date;
}
