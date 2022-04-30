import { Failure } from "../../../../core/error/failures";
import Business from "../../domain/entities/business";
import BusinessName from "../../domain/entities/business-name";
import BusinessManagingRepository from "../../domain/repositories/business-managing-repository";
import BusinessManagingRemoteDataSource from "../data-sources/business-managing-remote-data-source";
import BaseRepository from "../../../../core/types/BaseRepository";
import BusinessDataUpdate from "../../domain/entities/business-data-update";
import UnitDataUpdate from "../../domain/entities/unit-data-update";

class BusinessManagingRepositoryImpl extends BaseRepository implements BusinessManagingRepository {
  // Aqui, teoricamente também teria uma data source local, para fazer cache das informações.
  // pois é reposabilidade da implementação do repositório decidir usar os dados online ou do cache.
  // Como isso está além do escopo desse projeto, o Repositório só vai tratar as excessões e retornar failures.

  remoteData: BusinessManagingRemoteDataSource

  constructor(remoteData: BusinessManagingRemoteDataSource) {
    super()
    this.remoteData = remoteData
  }

  getBusinessData = async (id: number): Promise< Business | Failure> => {
    try {
      return await this.remoteData.getBusinessData(id)
    } catch (error) {
      return this.getNetworkFailureType(error)
    }
  }

  searchAllBusinesses = async (id: string): Promise< BusinessName[] | Failure> => {
    try {
      return await this.remoteData.searchAllBusinesses(id)
    } catch (error) {
      return this.getNetworkFailureType(error)
    }
  }
  

  updateBusinessValues = async (update: BusinessDataUpdate): Promise<Boolean | Failure> => {
    try {
      return await this.remoteData.updateBusinessValues(update)
    } catch (error) {
      return this.getNetworkFailureType(error)
    }
  }
  

  updateUnitValues = async (update: UnitDataUpdate): Promise< Boolean | Failure> => {
    try {
      return await this.remoteData.updateUnitValues(update)
    } catch (error) {
      return this.getNetworkFailureType(error)
    }
  }
}

export default BusinessManagingRepositoryImpl