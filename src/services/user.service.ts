import { InsertResult } from "typeorm";
import { User } from "../entities/user";

class UserService {
  public async findByUsername(username: string): Promise<User | null> {
    return await User.findOne({
      where: {
        username
      },
      select: ["id", "admin", "email", "username", "name", "surname", "password"]
    });
  }

  public async createUser(username: string, name: string, surname: string, email: string, password: string): Promise<number | null>  {
    const res: InsertResult = await User.insert({
      username,
      email,
      password,
      name,
      surname,
      admin: false
    });
    if (!res?.identifiers?.length)
      return null;

    return res.identifiers[0].id ?? null;
  }

  public async getUserById(id: number) {
    return await User.findOne({
      where: {
        id
      }
    });
  }

  public async getAllUsers() {
    return await User.find();
  }
}

export default new UserService;