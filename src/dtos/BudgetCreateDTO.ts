export class BudgetCreateDTO {
  public id?: number;
  public title: string;
  public description: string;
  public isMain: boolean;
  public monthYear: string;
  public limit: number;
  public ownerId: number;
  public users: number[];
}
