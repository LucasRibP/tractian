import { autoInjectable, singleton } from "tsyringe";
import { Failure } from "../../../../core/error/failures";
import UnitDataUpdate from "../entities/unit-data-update";
import BusinessManagingRepository from "../repositories/business-managing-repository";

@singleton()
@autoInjectable()
class UpdateUnitValues {
  repository: BusinessManagingRepository;

  constructor(repository?: BusinessManagingRepository) {
    this.repository = repository!;
  }

  execute = async (update: UnitDataUpdate): Promise<boolean | Failure> => {
    return await this.repository.updateUnitValues(update);
  };
}

export default UpdateUnitValues;
