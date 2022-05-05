import { Failure } from "../../../../core/error/failures";
import User from "../entities/user";
import UserManagingRepository from "../repositories/user-managing-repository";

class GetUserData {
  repository: UserManagingRepository;

  constructor({
    userManagingRepository,
  }: {
    userManagingRepository: UserManagingRepository;
  }) {
    this.repository = userManagingRepository;
  }

  execute = async (id: number): Promise<User | Failure> => {
    return await this.repository.getUserData(id);
  };
}

export default GetUserData;
