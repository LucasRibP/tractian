import UserName from "../../../../core/types/common-entities/user-name";
import User from "../../domain/entities/user";
import UserDataUpdate from "../../domain/entities/user-data-update";

interface UserManagingRemoteDataSource {
  /** Lança um [ServerError] para qualquer erro no servidor  */
  getUserData(id: number): Promise<User>;

  /** Lança um [ServerError] para qualquer erro no servidor  */
  searchAllUsers(query: string): Promise<UserName[]>;

  /** Lança um [ServerError] para qualquer erro no servidor  */
  updateUserValues(update: UserDataUpdate): Promise<boolean>;
}

export default UserManagingRemoteDataSource;
