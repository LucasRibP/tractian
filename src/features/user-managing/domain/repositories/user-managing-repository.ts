import { Failure } from "../../../../core/error/failures";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import UserName from "../../../../core/types/common-entities/user-name";
import MachineUserDelegation from "../entities/machine-user-delegation";
import User from "../entities/user";
import UserDataUpdate from "../entities/user-data-update";

interface UserManagingRepository {
  /** Recebe uma string com a pesquisa pelo nome de um usuário e retorna uma lista de [UserName]
   * ou um [Failure], relativo ao erro ocorrido.
   */
  searchAllUsers(query: string): Promise<UserName[] | Failure>;

  /** Recebe o id de um usuário retorna um objeto [User] com os dados do usuário
   * ou um [Failure], relativo ao erro ocorrido.
   */
  getUserData(id: number): Promise<User | Failure>;

  /** Recebe um objeto de update de um user e atualiza os campos não nulos, retornando um
   * [boolean] indicando se houve sucesso no update ou uma [Failure], relativa ao erro ocorrido
   */
  updateUserValues(update: UserDataUpdate): Promise<boolean | Failure>;

  /** Recebe um usuário retorna um [MachineHeader[]] com as maquinas localizadas na mesma empresa e unidade
   * do usuário, ou um [Failure], relativo ao erro ocorrido.
   */
  getMachinesAvaliableForUser(user: User): Promise<MachineHeader[] | Failure>;

  /** Recebe um [MachineUserDelegation] indicando uma máquina para delegar para um user, retornando um
   * [boolean] indicando se houve sucesso no update ou uma [Failure], relativa ao erro ocorrido
   */
  delegateUserForMachine(
    delegation: MachineUserDelegation
  ): Promise<boolean | Failure>;
}

export default UserManagingRepository;
