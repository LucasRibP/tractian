import axios, { AxiosError, AxiosInstance } from "axios";
import { Obj } from "reselect/es/types";
import BusinessManagingRemoteDataSource from "../../../features/business-managing/data/data-sources/business-managing-remote-data-source";
import Business from "../../../features/business-managing/domain/entities/business";
import BusinessDataUpdate from "../../../features/business-managing/domain/entities/business-data-update";
import BusinessName from "../../../features/business-managing/domain/entities/business-name";
import Unit from "../../../features/business-managing/domain/entities/unit";
import UnitDataUpdate from "../../../features/business-managing/domain/entities/unit-data-update";
import UserName from "../../types/common-entities/user-name";
import MachineManagingRemoteDataSource from "../../../features/machine-managing/data/data-sources/machine-managing-repository-data-source";
import Machine from "../../../features/machine-managing/domain/entities/machine";
import MachineDataUpdate from "../../../features/machine-managing/domain/entities/machine-data-update";
import { ServerError } from "../../error/errors";
import MachineHeader from "../../types/common-entities/machine-header";
import AssetResponse, {
  assetResponseError,
} from "./server-responses/asset-response";
import CompanyResponse, {
  companyResponseError,
} from "./server-responses/company-response";
import UnitResponse, {
  unitResponseError,
} from "./server-responses/unit-response";
import UserResponse, {
  userResponseError,
} from "./server-responses/user-response";

class TractianDataSource
  implements BusinessManagingRemoteDataSource, MachineManagingRemoteDataSource
{
  // Como no endpoint não tem nada guardando quem está delegado para a máquina, está sendo feito para propósitos de demonstração
  // esse salvamento de forma local.
  machineDelegation: Obj<number>;
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://my-json-server.typicode.com/tractian/fake-api/",
    });
    this.machineDelegation = {};
  }

  //! BusinessManaging Feature
  getBusinessData = async (id: number): Promise<Business> => {
    const resBus: CompanyResponse = await this._getCompanyResponseById(id);

    const resCurUnits: UnitResponse[] = (
      await this._getAllUnitsResponse()
    ).filter((unit) => (unit.companyId = resBus.id));
    const resCurAssets: AssetResponse[] = (
      await this._getAllAssetsResponse()
    ).filter((asset) => (asset.companyId = resBus.id));
    const resCurUsers: UserResponse[] = (
      await this._getAllUsersResponse()
    ).filter((user) => (user.companyId = resBus.id));

    const units: Unit[] = resCurUnits.map((unitRes) => {
      const unitAssets: MachineHeader[] = resCurAssets.filter(
        (asset) => (asset.unitId = unitRes.id)
      );
      const unitUsers: UserName[] = resCurUsers.filter(
        (user) => (user.unitId = resBus.id)
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
    const allBusinesses = await this._getAllCompaniesResponse();
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
      await this.instance.patch(`companies/${update.id}`, update);
      return true;
    }
    return true;
  };

  // Ele só retorna true, pois caso o request falhe, ele levanta um erro, que é tratado pelo repository
  updateUnitValues = async (update: UnitDataUpdate): Promise<boolean> => {
    if (update.name !== undefined) {
      await this.instance.patch(`units/${update.id}`, update);
      return true;
    }
    return true;
  };

  //! MachineManaging Feature
  getMachineData = async (id: number): Promise<Machine> => {
    const resAsset: AssetResponse = await this._getAssetResponseById(id);

    const resUnit: UnitResponse = await this._getUnitResponseById(
      resAsset.unitId
    );
    const resCompany: CompanyResponse = await this._getCompanyResponseById(
      resAsset.companyId
    );

    const delegateData: {
      delegateId?: number;
      delegateName?: string;
    } = {};
    if (resAsset.id in this.machineDelegation) {
      delegateData.delegateId = this.machineDelegation[resAsset.id];
      delegateData.delegateName = (
        await this._getUserResponseById(delegateData.delegateId)
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
    const allMachines = await this._getAllAssetsResponse();
    const searchFilter = query.trim().toLowerCase();
    const filteredBusinesses: MachineHeader[] = allMachines.filter((item) =>
      item.name.toLowerCase().includes(searchFilter)
    );
    return filteredBusinesses;
  };

  // Ele só retorna true, pois caso o request falhe, ele levanta um erro, que é tratado pelo repository
  updateMachineValues = async (update: MachineDataUpdate): Promise<boolean> => {
    if (update.name !== undefined) {
      await this.instance.patch(`assets/${update.id}`, update);
      return true;
    }
    return true;
  };

  //! Core
  _getAllAssetsResponse = async (): Promise<AssetResponse[]> => {
    try {
      const res = await this.instance.get<AssetResponse[]>("assets");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  _getAssetResponseById = async (id: number): Promise<AssetResponse> => {
    try {
      const res = await this.instance.get<AssetResponse>(`assets/${id}`);
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
      return assetResponseError;
    }
  };

  _getAllUnitsResponse = async (): Promise<UnitResponse[]> => {
    try {
      const res = await this.instance.get<UnitResponse[]>("units");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  _getUnitResponseById = async (id: number): Promise<UnitResponse> => {
    try {
      const res = await this.instance.get<UnitResponse>(`units/${id}`);
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
      return unitResponseError;
    }
  };

  _getAllCompaniesResponse = async (): Promise<CompanyResponse[]> => {
    try {
      const res = await this.instance.get<CompanyResponse[]>("companies");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  _getCompanyResponseById = async (id: number): Promise<CompanyResponse> => {
    try {
      const res = await this.instance.get<CompanyResponse>(`companies/${id}`);
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
      return companyResponseError;
    }
  };

  _getAllUsersResponse = async (): Promise<UserResponse[]> => {
    try {
      const res = await this.instance.get<UserResponse[]>("users");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  _getUserResponseById = async (id: number): Promise<UserResponse> => {
    try {
      const res = await this.instance.get<UserResponse>(`users/${id}`);
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
      return userResponseError;
    }
  };

  _treatAxiosError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const serverError: ServerError = {
        errorMessage: error.message,
        networkCode: error.response?.status ?? 404,
      };
      throw serverError;
    } else {
      throw error;
    }
  };
}

export default TractianDataSource;
