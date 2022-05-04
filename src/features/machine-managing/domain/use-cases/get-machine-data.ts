import { Failure } from "../../../../core/error/failures";
import Machine from "../entities/machine";
import MachineManagingRepository from "../repositories/machine-managing-repository";

class GetMachineData {
  repository: MachineManagingRepository;

  constructor({
    machineManagingRepository,
  }: {
    machineManagingRepository: MachineManagingRepository;
  }) {
    this.repository = machineManagingRepository;
  }

  execute = async (id: number): Promise<Machine | Failure> => {
    return await this.repository.getMachineData(id);
  };
}

export default GetMachineData;
