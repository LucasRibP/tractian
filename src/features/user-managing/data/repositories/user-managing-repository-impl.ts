import { Failure } from "../../../../core/error/failures";
import BaseRepository from "../../../../core/types/BaseRepository";
import UserManagingRepository from "../../domain/repositories/user-managing-repository";
import UserManagingRemoteDataSource from "../data-sources/user-managing-remote-data-source";
import User from "../../domain/entities/user";
import UserName from "../../../../core/types/common-entities/user-name";
import UserDataUpdate from "../../domain/entities/user-data-update";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import MachineUserDelegation from "../../domain/entities/machine-user-delegation";

class UserManagingRepositoryImpl
  extends BaseRepository
  implements UserManagingRepository
{
  // Aqui, teoricamente também teria uma data source local, para fazer cache das informações.
  // pois é reposabilidade da implementação do repositório decidir usar os dados online ou do cache.
  // Como isso está além do escopo desse projeto, o Repositório só vai tratar as excessões e retornar failures.

  remoteData: UserManagingRemoteDataSource;

  constructor({
    userManagingRemoteDataSource,
  }: {
    userManagingRemoteDataSource: UserManagingRemoteDataSource;
  }) {
    super();
    this.remoteData = userManagingRemoteDataSource;
  }

  getUserData = async (id: number): Promise<User | Failure> => {
    try {
      return await this.remoteData.getUserData(id);
    } catch (error) {
      return this.getNetworkFailureType(error);
    }
  };

  searchAllUsers = async (id: string): Promise<UserName[] | Failure> => {
    try {
      return await this.remoteData.searchAllUsers(id);
    } catch (error) {
      return this.getNetworkFailureType(error);
    }
  };

  updateUserValues = async (
    update: UserDataUpdate
  ): Promise<boolean | Failure> => {
    try {
      return await this.remoteData.updateUserValues(update);
    } catch (error) {
      return this.getNetworkFailureType(error);
    }
  };

  getMachinesAvaliableForUser = async (
    user: User
  ): Promise<MachineHeader[] | Failure> => {
    try {
      return await this.remoteData.getMachinesAvaliableForUser(user);
    } catch (error) {
      return this.getNetworkFailureType(error);
    }
  };

  delegateUserForMachine = async (
    delegation: MachineUserDelegation
  ): Promise<boolean | Failure> => {
    try {
      return await this.remoteData.delegateUserForMachine(delegation);
    } catch (error) {
      return this.getNetworkFailureType(error);
    }
  };
}

export default UserManagingRepositoryImpl;
