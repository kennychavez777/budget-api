import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
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

  @httpGet('/:id')
  public async getUserByID(req: Request, res: Response): Promise<User> {
    const { id } = req.params;

    if (!id){
      res.status(400).send({
        status: 'Error',
        msg: 'El id del usuario no existe'
      });
    }

    return this._userService.getUserById(parseInt(id));
  }

  @httpPost('/login')
  public async login(req: Request, res: Response): Promise<User> {
    const { email, password } = req.body;

    return this._userService.login(email, password);
  }

  @httpPost('/')
  public async createUser(req: Request, res: Response): Promise<User> {
    const user: UserDTO = req.body;

    return this._userService.createUser(user);
  }

  @httpPut('/:id')
  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    let data = { id, ...req.body };

    try {
      const user = await this._userService.updateUser(data);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      } else {
        res.status(400).send('Unknown error ocurred.')
      }
    }
  }

  @httpDelete('/:id')
  public async deleteUser(req: Request, res: Response) {
    if(!req.params.id) throw new Error('Error: El id del usuario no ha sido encontrado.');

    const id = parseInt(req.params.id);

    try {
      await this._userService.deleteUser(id);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send(error.message);
      } else {
        res.status(404).send('Unknown error ocurred.');
      }
    }

    res.status(200).send({
      status: 'success',
      msg: 'Usuario eliminado correctamente.'
    });
  }
}
