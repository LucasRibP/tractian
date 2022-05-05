import { Failure } from "../../../../core/error/failures";
import UserName from "../../../../core/types/common-entities/user-name";
import UserManagingRepository from "../repositories/user-managing-repository";

class SearchAllUsers {
  repository: UserManagingRepository;

  constructor({
    userManagingRepository,
  }: {
    userManagingRepository: UserManagingRepository;
  }) {
    this.repository = userManagingRepository;
  }

  execute = async (query: string): Promise<UserName[] | Failure> => {
    return await this.repository.searchAllUsers(query);
  };
}

export default SearchAllUsers;
