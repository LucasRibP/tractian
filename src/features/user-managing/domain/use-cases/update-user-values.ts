import { Failure } from "../../../../core/error/failures";
import UserDataUpdate from "../entities/user-data-update";
import UserManagingRepository from "../repositories/user-managing-repository";

class UpdateUserValues {
  repository: UserManagingRepository;

  constructor({
    userManagingRepository,
  }: {
    userManagingRepository: UserManagingRepository;
  }) {
    this.repository = userManagingRepository;
  }

  execute = async (update: UserDataUpdate): Promise<boolean | Failure> => {
    return await this.repository.updateUserValues(update);
  };
}

export default UpdateUserValues;
