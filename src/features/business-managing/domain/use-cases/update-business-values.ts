import { Failure } from "../../../../core/error/failures";
import BusinessDataUpdate from "../entities/business-data-update";
import BusinessManagingRepository from "../repositories/business-managing-repository";

class UpdateBusinessValues {
  repository: BusinessManagingRepository;

  constructor({
    businessManagingRepository,
  }: {
    businessManagingRepository: BusinessManagingRepository;
  }) {
    this.repository = businessManagingRepository;
  }

  execute = async (update: BusinessDataUpdate): Promise<boolean | Failure> => {
    return await this.repository.updateBusinessValues(update);
  };
}

export default UpdateBusinessValues;
