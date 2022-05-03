import Business from "../../domain/entities/business";
import BusinessDataUpdate from "../../domain/entities/business-data-update";
import BusinessName from "../../domain/entities/business-name";
import UnitDataUpdate from "../../domain/entities/unit-data-update";

interface BusinessManagingRemoteDataSource {
  /** Lança um [ServerError] para qualquer erro no servidor  */
  getBusinessData(id: number): Promise<Business>;

  /** Lança um [ServerError] para qualquer erro no servidor  */
  searchAllBusinesses(query: string): Promise<BusinessName[]>;

  /** Lança um [ServerError] para qualquer erro no servidor  */
  updateBusinessValues(update: BusinessDataUpdate): Promise<boolean>;

  /** Lança um [ServerError] para qualquer erro no servidor  */
  updateUnitValues(update: UnitDataUpdate): Promise<boolean>;
}

export default BusinessManagingRemoteDataSource;
