import { Failure } from "../../../../core/error/failures";
import BaseRepository from "../../../../core/types/BaseRepository";
import MachineManagingRepository from "../../domain/repositories/machine-managing-repository";
import MachineManagingRemoteDataSource from "../data-sources/machine-managing-remote-data-source";
import Machine from "../../domain/entities/machine";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import MachineDataUpdate from "../../domain/entities/machine-data-update";

class MachineManagingRepositoryImpl
  extends BaseRepository
  implements MachineManagingRepository
{
  // Aqui, teoricamente também teria uma data source local, para fazer cache das informações.
  // pois é reposabilidade da implementação do repositório decidir usar os dados online ou do cache.
  // Como isso está além do escopo desse projeto, o Repositório só vai tratar as excessões e retornar failures.

  remoteData: MachineManagingRemoteDataSource;

  constructor({
    machineManagingRemoteDataSource,
  }: {
    machineManagingRemoteDataSource: MachineManagingRemoteDataSource;
  }) {
    super();
    this.remoteData = machineManagingRemoteDataSource;
  }

  getMachineData = async (id: number): Promise<Machine | Failure> => {
    try {
      return await this.remoteData.getMachineData(id);
    } catch (error) {
      return this.getNetworkFailureType(error);
    }
  };

  searchAllMachines = async (
    id: string
  ): Promise<MachineHeader[] | Failure> => {
    try {
      return await this.remoteData.searchAllMachines(id);
    } catch (error) {
      return this.getNetworkFailureType(error);
    }
  };

  updateMachineValues = async (
    update: MachineDataUpdate
  ): Promise<boolean | Failure> => {
    try {
      return await this.remoteData.updateMachineValues(update);
    } catch (error) {
      return this.getNetworkFailureType(error);
    }
  };
}

export default MachineManagingRepositoryImpl;
