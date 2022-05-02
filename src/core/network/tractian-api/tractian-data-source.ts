import axios, { AxiosError, AxiosInstance } from "axios";
import BusinessManagingRemoteDataSource from "../../../features/business-managing/data/data-sources/business-managing-remote-data-source";
import Business from "../../../features/business-managing/domain/entities/business";
import BusinessDataUpdate from "../../../features/business-managing/domain/entities/business-data-update";
import BusinessName from "../../../features/business-managing/domain/entities/business-name";
import MachineName from "../../../features/business-managing/domain/entities/machine-name";
import Unit from "../../../features/business-managing/domain/entities/unit";
import UnitDataUpdate from "../../../features/business-managing/domain/entities/unit-data-update";
import UserName from "../../../features/business-managing/domain/entities/user-name";
import { ServerError } from "../../error/errors";
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

class TractianDataSource implements BusinessManagingRemoteDataSource {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://my-json-server.typicode.com/tractian/fake-api/",
    });
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
      const unitAssets: MachineName[] = resCurAssets.filter(
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

  updateBusinessValues = async (
    update: BusinessDataUpdate
  ): Promise<Boolean> => {
    return true;
  };

  updateUnitValues = async (update: UnitDataUpdate): Promise<Boolean> => {
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
      const res = await this.instance.get<CompanyResponse[]>("Companies");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  _getCompanyResponseById = async (id: number): Promise<CompanyResponse> => {
    try {
      const res = await this.instance.get<CompanyResponse>(`Companies/${id}`);
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
