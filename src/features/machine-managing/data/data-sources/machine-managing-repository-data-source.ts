import MachineHeader from "../../../../core/types/common-entities/machine-header";
import Machine from "../../domain/entities/machine";
import MachineDataUpdate from "../../domain/entities/machine-data-update";

interface MachineManagingRemoteDataSource {
  /** Lança um [ServerError] para qualquer erro no servidor  */
  getMachineData(id: number): Promise<Machine>;

  /** Lança um [ServerError] para qualquer erro no servidor  */
  searchAllMachines(query: string): Promise<MachineHeader[]>;

  /** Lança um [ServerError] para qualquer erro no servidor  */
  updateMachineValues(update: MachineDataUpdate): Promise<boolean>;
}

export default MachineManagingRemoteDataSource;
