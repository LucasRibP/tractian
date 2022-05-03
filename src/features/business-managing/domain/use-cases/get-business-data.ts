import { autoInjectable, singleton } from "tsyringe";
import { Failure } from "../../../../core/error/failures";
import Business from "../entities/business";
import BusinessManagingRepository from "../repositories/business-managing-repository";

@singleton()
@autoInjectable()
class GetBusinessData {
  repository: BusinessManagingRepository;

  constructor(repository?: BusinessManagingRepository) {
    this.repository = repository!;
  }

  execute = async (id: number): Promise<Business | Failure> => {
    return await this.repository.getBusinessData(id);
  };
}

export default GetBusinessData;
