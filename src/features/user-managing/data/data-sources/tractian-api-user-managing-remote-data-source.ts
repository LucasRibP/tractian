import CompanyResponse from "../../../../core/network/tractian-api/server-responses/company-response";
import UnitResponse from "../../../../core/network/tractian-api/server-responses/unit-response";
import UserResponse from "../../../../core/network/tractian-api/server-responses/user-response";
import TractianDataSource from "../../../../core/network/tractian-api/tractian-data-source";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import UserName from "../../../../core/types/common-entities/user-name";
import User from "../../domain/entities/user";
import UserDataUpdate from "../../domain/entities/user-data-update";
import UserManagingRemoteDataSource from "./user-managing-remote-data-source";

class TractianApiUserManagingRemoteDataSource
  implements UserManagingRemoteDataSource
{
  tractianApi: TractianDataSource;

  constructor({
    tractianDataSource,
  }: {
    tractianDataSource: TractianDataSource;
  }) {
    this.tractianApi = tractianDataSource;
  }

  getUserData = async (id: number): Promise<User> => {
    const resUser: UserResponse = await this.tractianApi.getUserResponseById(
      id
    );

    const resUnit: UnitResponse = await this.tractianApi.getUnitResponseById(
      resUser.unitId
    );
    const resCompany: CompanyResponse =
      await this.tractianApi.getCompanyResponseById(resUser.companyId);

    const delegateMachines: MachineHeader[] = [];
    for (let [machineId, userId] of Object.entries(
      this.tractianApi.machineDelegation
    )) {
      if (id === userId) {
        delegateMachines.push(
          await this.tractianApi.getAssetResponseById(
            Number.parseInt(machineId)
          )
        );
      }
    }

    return {
      ...resUser,
      unitName: resUnit.name,
      companyName: resCompany.name,
      delegatedMachines: delegateMachines,
    };
  };

  // Isso seria mais eficiente caso houvesse uma opção na API para mandar somente os nomes
  // ou fazer buscas entre todas as empresas do usuário
  searchAllUsers = async (query: string): Promise<UserName[]> => {
    const allUsers = await this.tractianApi.getAllUsersResponse();
    const searchFilter = query.trim().toLowerCase();
    const filteredUsers: UserName[] = allUsers.filter((item) =>
      item.name.toLowerCase().includes(searchFilter)
    );
    return filteredUsers;
  };

  // Ele só retorna true, pois caso o request falhe, ele levanta um erro, que é tratado pelo repository
  updateUserValues = async (update: UserDataUpdate): Promise<boolean> => {
    await this.tractianApi.instance.patch(`users/${update.id}`, update);
    return true;
  };
}

export default TractianApiUserManagingRemoteDataSource;
