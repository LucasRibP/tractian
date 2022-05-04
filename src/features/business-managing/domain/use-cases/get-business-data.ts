import { Failure } from "../../../../core/error/failures";
import Business from "../entities/business";
import BusinessManagingRepository from "../repositories/business-managing-repository";

class GetBusinessData {
  repository: BusinessManagingRepository;

  constructor({
    businessManagingRepository,
  }: {
    businessManagingRepository: BusinessManagingRepository;
  }) {
    this.repository = businessManagingRepository;
  }

  execute = async (id: number): Promise<Business | Failure> => {
    return await this.repository.getBusinessData(id);
  };
}

export default GetBusinessData;
