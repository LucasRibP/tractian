import AssetResponse from "../../../../core/network/tractian-api/server-responses/asset-response";
import CompanyResponse from "../../../../core/network/tractian-api/server-responses/company-response";
import UnitResponse from "../../../../core/network/tractian-api/server-responses/unit-response";
import UserResponse from "../../../../core/network/tractian-api/server-responses/user-response";
import TractianDataSource from "../../../../core/network/tractian-api/tractian-data-source";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import UserName from "../../../../core/types/common-entities/user-name";
import Business from "../../domain/entities/business";
import BusinessDataUpdate from "../../domain/entities/business-data-update";
import BusinessName from "../../domain/entities/business-name";
import Unit from "../../domain/entities/unit";
import UnitDataUpdate from "../../domain/entities/unit-data-update";
import BusinessManagingRemoteDataSource from "./business-managing-remote-data-source";

class TractianApiBusinessManagingRemoteDataSource
  implements BusinessManagingRemoteDataSource
{
  tractianApi: TractianDataSource;

  constructor({
    tractianDataSource,
  }: {
    tractianDataSource: TractianDataSource;
  }) {
    this.tractianApi = tractianDataSource;
  }

  getBusinessData = async (id: number): Promise<Business> => {
    const resBus: CompanyResponse =
      await this.tractianApi.getCompanyResponseById(id);

    const resCurUnits: UnitResponse[] = (
      await this.tractianApi.getAllUnitsResponse()
    ).filter((unit) => (unit.companyId = resBus.id));
    const resCurAssets: AssetResponse[] = (
      await this.tractianApi.getAllAssetsResponse()
    ).filter((asset) => (asset.companyId = resBus.id));
    const resCurUsers: UserResponse[] = (
      await this.tractianApi.getAllUsersResponse()
    ).filter((user) => (user.companyId = resBus.id));

    const units: Unit[] = resCurUnits.map((unitRes) => {
      const unitAssets: MachineHeader[] = resCurAssets.filter(
        (asset) => asset.unitId === unitRes.id
      );
      const unitUsers: UserName[] = resCurUsers.filter(
        (user) => user.unitId === unitRes.id
      );
      const unit: Unit = {
        ...unitRes,
        machines: unitAssets,
        users: unitUsers,
      };
      return unit;
    });

    return {
      ...resBus,
      units: units,
    };
  };

  // Isso seria mais eficiente caso houvesse uma opção na API para mandar somente os nomes
  // ou fazer buscas entre todas as empresas do usuário
  searchAllBusinesses = async (query: string): Promise<BusinessName[]> => {
    const allBusinesses = await this.tractianApi.getAllCompaniesResponse();
    const searchFilter = query.trim().toLowerCase();
    const filteredBusinesses: BusinessName[] = allBusinesses.filter((item) =>
      item.name.toLowerCase().includes(searchFilter)
    );
    return filteredBusinesses;
  };

  // Ele só retorna true, pois caso o request falhe, ele levanta um erro, que é tratado pelo repository
  updateBusinessValues = async (
    update: BusinessDataUpdate
  ): Promise<boolean> => {
    if (update.name !== undefined) {
      await this.tractianApi.instance.patch(`companies/${update.id}`, update);
      return true;
    }
    return true;
  };

  // Ele só retorna true, pois caso o request falhe, ele levanta um erro, que é tratado pelo repository
  updateUnitValues = async (update: UnitDataUpdate): Promise<boolean> => {
    if (update.name !== undefined) {
      await this.tractianApi.instance.patch(`units/${update.id}`, update);
      return true;
    }
    return true;
  };
}

export default TractianApiBusinessManagingRemoteDataSource;
