import Business from "../../domain/entities/business";
import BusinessName from "../../domain/entities/business-name";

interface BusinessManagingRemoteDataSource {
  /** Lança um [ServerError] para qualquer erro no servidor  */
  getBusinessData(id: number) : Promise<Business>;

  /** Lança um [ServerError] para qualquer erro no servidor  */
  searchAllBusinesses(query: string): Promise<BusinessName[]>;
}

export default BusinessManagingRemoteDataSource