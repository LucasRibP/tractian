import { Failure } from "../../../../core/error/failures";
import MachineDataUpdate from "../entities/machine-data-update";
import MachineManagingRepository from "../repositories/machine-managing-repository";

class UpdateMachineValues {
  repository: MachineManagingRepository;

  constructor({
    machineManagingRepository,
  }: {
    machineManagingRepository: MachineManagingRepository;
  }) {
    this.repository = machineManagingRepository;
  }

  execute = async (update: MachineDataUpdate): Promise<boolean | Failure> => {
    return await this.repository.updateMachineValues(update);
  };
}

export default UpdateMachineValues;
