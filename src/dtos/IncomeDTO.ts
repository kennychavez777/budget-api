import { UserDTO } from "./UserDTO";
import { WayToPayDTO } from "./WayToPayDTO";

export class IncomeDTO {
  public id: number;
  public title: string;
  public description: string;
  public total: number;
  public monthYear: string;
  public user: UserDTO;
  public wayToPay: WayToPayDTO;
  public createdAt: Date;
  public updatedAt: Date;
}
