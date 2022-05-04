import { Failure } from "../../../../core/error/failures";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import MachineManagingRepository from "../repositories/machine-managing-repository";

class SearchAllMachines {
  repository: MachineManagingRepository;

  constructor({
    machineManagingRepository,
  }: {
    machineManagingRepository: MachineManagingRepository;
  }) {
    this.repository = machineManagingRepository;
  }

  execute = async (query: string): Promise<MachineHeader[] | Failure> => {
    return await this.repository.searchAllMachines(query);
  };
}

export default SearchAllMachines;
