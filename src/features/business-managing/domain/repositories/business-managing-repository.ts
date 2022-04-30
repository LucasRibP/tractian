import { Failure } from "../../../../core/error/failures";
import Business from "../entities/business"
import BusinessDataUpdate from "../entities/business-data-update";
import BusinessName from "../entities/business-name";
import UnitDataUpdate from "../entities/unit-data-update";

interface BusinessManagingRepository {
  /** Recebe uma string com a pesquisa pelo nome de uma empresa e retorna uma lista de [BusinessName]
   * ou um [Failure], relativo ao erro ocorrido.
   */
  searchAllBusinesses(query: string): Promise<BusinessName[]|Failure>;

  /** Recebe o id de uma empresa retorna um objeto [Business] com os dados da empresa
   * ou um [Failure], relativo ao erro ocorrido.
   */
  getBusinessData(id: number): Promise<Business|Failure>;
  
  /** Recebe um objeto de update de um um business e atualiza os campos não nulos, retornando um 
   * [boolean] indicando se houve sucesso no update ou uma [Failure], relativa ao erro ocorrido
   */
  updateBusinessValues(update: BusinessDataUpdate): Promise<Boolean|Failure>;
  
  /** Recebe um objeto de update de um um unit e atualiza os campos não nulos, retornando um 
   * [boolean] indicando se houve sucesso no update ou uma [Failure], relativa ao erro ocorrido
   */
  updateUnitValues(update: UnitDataUpdate): Promise<Boolean|Failure>
}

export default BusinessManagingRepository