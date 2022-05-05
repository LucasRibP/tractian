import { Failure } from "../../../../core/error/failures";
import MachineHeader from "../../../../core/types/common-entities/machine-header";
import Machine from "../entities/machine";
import MachineDataUpdate from "../entities/machine-data-update";

interface MachineManagingRepository {
  /** Recebe uma string com a pesquisa pelo nome de uma máquina e retorna uma lista de [MachineHeader]
   * ou um [Failure], relativo ao erro ocorrido.
   */
  searchAllMachines(query: string): Promise<MachineHeader[] | Failure>;

  /** Recebe o id de uma máquina retorna um objeto [Machine] com os dados da máquina
   * ou um [Failure], relativo ao erro ocorrido.
   */
  getMachineData(id: number): Promise<Machine | Failure>;

  /** Recebe um objeto de update de uma máquina e atualiza os campos não nulos, retornando um
   * [boolean] indicando se houve sucesso no update ou uma [Failure], relativa ao erro ocorrido
   */
  updateMachineValues(update: MachineDataUpdate): Promise<boolean | Failure>;
}

export default MachineManagingRepository;
