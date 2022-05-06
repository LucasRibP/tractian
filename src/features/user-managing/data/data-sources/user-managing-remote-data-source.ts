import MachineHeader from "../../../../core/types/common-entities/machine-header";
import UserName from "../../../../core/types/common-entities/user-name";
import MachineUserDelegation from "../../domain/entities/machine-user-delegation";
import User from "../../domain/entities/user";
import UserDataUpdate from "../../domain/entities/user-data-update";

interface UserManagingRemoteDataSource {
  /** Lança um [ServerError] para qualquer erro no servidor  */

  getUserData(id: number): Promise<User>;
  searchAllUsers(query: string): Promise<UserName[]>;
  updateUserValues(update: UserDataUpdate): Promise<boolean>;
  getMachinesAvaliableForUser(user: User): Promise<MachineHeader[]>;
  delegateUserForMachine(delegation: MachineUserDelegation): Promise<boolean>;
}

export default UserManagingRemoteDataSource;
