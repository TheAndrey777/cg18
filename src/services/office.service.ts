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

  public async findOfficeById(id: number) {
    return await Office.findOne({
      where: {
        id
      },
      relations: {
        workers: true
      }
    });
  }

  public async addWorker(office: Office, worker: User) {
    office.workers.push(worker);
    await office.save();
  }
}

export default new OfficeService;