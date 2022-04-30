import { Failure } from "../../../../core/error/failures";
import Business from "../entities/business"
import BusinessName from "../entities/business-name";

interface BusinessManagingRepository {
  searchAllBusinesses(query: string): Promise<BusinessName[]|Failure>;
  getBusinessData(id: number): Promise<Business|Failure>;
}

export default BusinessManagingRepository