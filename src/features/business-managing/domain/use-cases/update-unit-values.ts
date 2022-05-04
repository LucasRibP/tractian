import { Failure } from "../../../../core/error/failures";
import UnitDataUpdate from "../entities/unit-data-update";
import BusinessManagingRepository from "../repositories/business-managing-repository";

class UpdateUnitValues {
  repository: BusinessManagingRepository;

  constructor({
    businessManagingRepository,
  }: {
    businessManagingRepository: BusinessManagingRepository;
  }) {
    this.repository = businessManagingRepository;
  }

  execute = async (update: UnitDataUpdate): Promise<boolean | Failure> => {
    return await this.repository.updateUnitValues(update);
  };
}

export default UpdateUnitValues;
