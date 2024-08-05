import { UserDTO } from "../dtos/UserDTO";

export interface IUserService {
  getAllUsers(): any;
  getUserById(id: number): any;
  login(email: string, password: string): any;
  createUser(user: UserDTO): any;
  updateUser(user: UserDTO): any;
  deleteUser(id: number): any;
}
