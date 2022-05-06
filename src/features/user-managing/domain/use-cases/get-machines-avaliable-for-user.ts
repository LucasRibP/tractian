import { Failure } from "../../../../core/error/failures";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import User from "../entities/user";
import UserManagingRepository from "../repositories/user-managing-repository";

class GetMachinesAvaliableForUser {
  repository: UserManagingRepository;

  constructor({
    userManagingRepository,
  }: {
    userManagingRepository: UserManagingRepository;
  }) {
    this.repository = userManagingRepository;
  }

  execute = async (user: User): Promise<MachineHeader[] | Failure> => {
    return await this.repository.getMachinesAvaliableForUser(user);
  };
}

export default GetMachinesAvaliableForUser;
