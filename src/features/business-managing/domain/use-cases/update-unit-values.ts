import { Failure } from "../../../../core/error/failures";
import UnitDataUpdate from "../entities/unit-data-update";
import BusinessManagingRepository from "../repositories/business-managing-repository";

class UpdateUnitValues {
  repository: BusinessManagingRepository;

  constructor(repository: BusinessManagingRepository) {
    this.repository = repository
  }

  execute = async (update: UnitDataUpdate):  Promise<Boolean|Failure> => {
    return await this.repository.updateUnitValues(update)
  }
}

export default UpdateUnitValues