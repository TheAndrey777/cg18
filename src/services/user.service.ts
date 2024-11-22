import { InsertResult } from "typeorm";
import { User } from "../entities/user";

class UserService {
  public async findByUsername(username: string): Promise<User | null> {
    return await User.findOne({
      where: {
        username
      }
    });
  }

  public async createUser(username: string, password: string): Promise<number | null>  {
    const res: InsertResult = await User.insert({
      username,
      password,
      admin: false
    });
    if (!res?.identifiers?.length)
      return null;

    return res.identifiers[0].id ?? null;
  }
}

export default new UserService;