import axios, { AxiosError, AxiosInstance } from "axios";
import { Obj } from "reselect/es/types";
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

class TractianDataSource {
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

  getAllAssetsResponse = async (): Promise<AssetResponse[]> => {
    try {
      const res = await this.instance.get<AssetResponse[]>("assets");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  getAssetResponseById = async (id: number): Promise<AssetResponse> => {
    try {
      const res = await this.instance.get<AssetResponse>(`assets/${id}`);
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
      return assetResponseError;
    }
  };

  getAllUnitsResponse = async (): Promise<UnitResponse[]> => {
    try {
      const res = await this.instance.get<UnitResponse[]>("units");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  getUnitResponseById = async (id: number): Promise<UnitResponse> => {
    try {
      const res = await this.instance.get<UnitResponse>(`units/${id}`);
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
      return unitResponseError;
    }
  };

  getAllCompaniesResponse = async (): Promise<CompanyResponse[]> => {
    try {
      const res = await this.instance.get<CompanyResponse[]>("companies");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  getCompanyResponseById = async (id: number): Promise<CompanyResponse> => {
    try {
      const res = await this.instance.get<CompanyResponse>(`companies/${id}`);
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
      return companyResponseError;
    }
  };

  getAllUsersResponse = async (): Promise<UserResponse[]> => {
    try {
      const res = await this.instance.get<UserResponse[]>("users");
      return res.data;
    } catch (error) {
      this._treatAxiosError(error);
    }
    return [];
  };

  getUserResponseById = async (id: number): Promise<UserResponse> => {
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
