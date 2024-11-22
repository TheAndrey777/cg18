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

  public async getAllOffices() {
    return await Office.find({ 
      relations: {
        workers: true
      },
   });
  }
}

export default new OfficeService;