import { controller, httpGet, httpPost } from "inversify-express-utils";
import { IUserService } from "../interfaces/IUserService";
import { inject } from "inversify";
import { TYPES } from "../types";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { UserDTO } from "../dtos/UserDTO";

@controller("/user")
export class UserController {
  private _userService: IUserService;

  constructor(@inject(TYPES.IUserService) userService: IUserService) {
    this._userService = userService;
  }

  @httpGet('/')
  public async getAllUsers(): Promise<User[]> {
    return this._userService.getAllUsers();
  }

  @httpPost('/')
  public async createUser(req: Request, res: Response): Promise<User> {
    const user: UserDTO = req.body;

    return this._userService.createUser(user);
  }
}
