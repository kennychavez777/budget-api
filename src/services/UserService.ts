import { inject, injectable } from "inversify";
import { UserDTO } from "../dtos/UserDTO";
import { IUserService } from "../interfaces/IUserService";
import { UserRepository } from "../repositories/UserRepository";
import { TYPES } from "../types";
import { User } from "../entities/User";
import { getCurrentDate } from "../utils/dateHandler";

@injectable()
export class UserService implements IUserService {
  private _userRepository: UserRepository;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this._userRepository = userRepository;
  }
  public async getAllUsers(): Promise<User[]> {
    return await this._userRepository.find();
  }

  public async getUserById(id: number): Promise<User> {
    const user = await this._userRepository.findOneBy({ id: id });

    if (!user) throw new Error("El usuario no fue encontrado.");

    return user;
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this._userRepository.findOneBy({
      email: email,
      password: password,
    });

    if (!user) throw new Error("Credenciales invalidas.");

    return user;
  }

  public async createUser(data: UserDTO): Promise<User> {
    const user = new User();
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.nickname = data.nickname ? data.nickname : "";
    user.email = data.email;
    user.password = data.password;
    user.photo = data.photo
      ? data.photo
      : "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png";
    user.description = data.description ? data.description : "";
    // user.createdAt = getCurrentDate();

    return await this._userRepository.save(user);
  }

  public async updateUser(data: UserDTO) {
    const user = await this._userRepository.findOneBy({ id: data.id });

    if (!user) throw new Error("No se encontró ningún usuario");

    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.nickname = data.nickname ? data.nickname : "";
    user.email = data.email;
    user.password = data.password;
    user.photo = data.photo
      ? data.photo
      : "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png";
    user.description = data.description ? data.description : "";

    return await this._userRepository.save(user);
  }

  public async deleteUser(id: number) {
    if (!id) {
      throw new Error("No se encontro ningun id para eliminar el usuario.");
    }

    return await this._userRepository.delete(id);
  }
}
