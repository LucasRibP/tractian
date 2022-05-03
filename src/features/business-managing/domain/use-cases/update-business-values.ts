import { autoInjectable, singleton } from "tsyringe";
import { Failure } from "../../../../core/error/failures";
import BusinessDataUpdate from "../entities/business-data-update";
import BusinessManagingRepository from "../repositories/business-managing-repository";

@singleton()
@autoInjectable()
class UpdateBusinessValues {
  repository: BusinessManagingRepository;

  constructor(repository?: BusinessManagingRepository) {
    this.repository = repository!;
  }

  execute = async (update: BusinessDataUpdate): Promise<boolean | Failure> => {
    return await this.repository.updateBusinessValues(update);
  };
}

export default UpdateBusinessValues;
