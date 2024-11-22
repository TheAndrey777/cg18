import { InsertResult } from "typeorm";
import { Office } from "../entities/office";
import { User } from "../entities/user";

class OfficeService {
  public async createOffice(name: string, address: string, user: User): Promise<Office | null> {
    return await Office.save({
      name,
      address,
      workers: [user]
    });
  }
}

export default new OfficeService;