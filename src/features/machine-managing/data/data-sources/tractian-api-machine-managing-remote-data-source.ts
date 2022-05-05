import AssetResponse from "../../../../core/network/tractian-api/server-responses/asset-response";
import CompanyResponse from "../../../../core/network/tractian-api/server-responses/company-response";
import UnitResponse from "../../../../core/network/tractian-api/server-responses/unit-response";
import TractianDataSource from "../../../../core/network/tractian-api/tractian-data-source";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import Machine from "../../domain/entities/machine";
import MachineDataUpdate from "../../domain/entities/machine-data-update";
import MachineManagingRemoteDataSource from "./machine-managing-remote-data-source";

class TractianApiMachineManagingRemoteDataSource
  implements MachineManagingRemoteDataSource
{
  tractianApi: TractianDataSource;

  constructor({
    tractianDataSource,
  }: {
    tractianDataSource: TractianDataSource;
  }) {
    this.tractianApi = tractianDataSource;
  }

  getMachineData = async (id: number): Promise<Machine> => {
    const resAsset: AssetResponse = await this.tractianApi.getAssetResponseById(
      id
    );

    const resUnit: UnitResponse = await this.tractianApi.getUnitResponseById(
      resAsset.unitId
    );
    const resCompany: CompanyResponse =
      await this.tractianApi.getCompanyResponseById(resAsset.companyId);

    const delegateData: {
      delegateId?: number;
      delegateName?: string;
    } = {};
    if (resAsset.id in this.tractianApi.machineDelegation) {
      delegateData.delegateId = this.tractianApi.machineDelegation[resAsset.id];
      delegateData.delegateName = (
        await this.tractianApi.getUserResponseById(delegateData.delegateId)
      ).name;
    }

    return {
      ...resAsset,
      unitName: resUnit.name,
      companyName: resCompany.name,
      ...delegateData,
    };
  };

  // Isso seria mais eficiente caso houvesse uma opção na API para mandar somente os nomes
  // ou fazer buscas entre todas as empresas do usuário
  searchAllMachines = async (query: string): Promise<MachineHeader[]> => {
    const allMachines = await this.tractianApi.getAllAssetsResponse();
    const searchFilter = query.trim().toLowerCase();
    const filteredMachines: MachineHeader[] = allMachines.filter((item) =>
      item.name.toLowerCase().includes(searchFilter)
    );
    return filteredMachines;
  };

  // Ele só retorna true, pois caso o request falhe, ele levanta um erro, que é tratado pelo repository
  updateMachineValues = async (update: MachineDataUpdate): Promise<boolean> => {
    await this.tractianApi.instance.patch(`assets/${update.id}`, update);
    return true;
  };
}

export default TractianApiMachineManagingRemoteDataSource;
