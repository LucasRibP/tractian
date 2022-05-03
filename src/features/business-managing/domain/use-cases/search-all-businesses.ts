import { autoInjectable, singleton } from "tsyringe";
import { Failure } from "../../../../core/error/failures";
import BusinessName from "../entities/business-name";
import BusinessManagingRepository from "../repositories/business-managing-repository";

@singleton()
@autoInjectable()
class SearchAllBusinesses {
  repository: BusinessManagingRepository;

  constructor(repository?: BusinessManagingRepository) {
    this.repository = repository!;
  }

  execute = async (query: string): Promise<BusinessName[] | Failure> => {
    return await this.repository.searchAllBusinesses(query);
  };
}

export default SearchAllBusinesses;
