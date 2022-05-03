import GetBusinessData from "./get-business-data";
import SearchAllBusinesses from "./search-all-businesses";
import UpdateBusinessValues from "./update-business-values";
import UpdateUnitValues from "./update-unit-values";

const businessManagingUseCases = {
  getBusinessData: new GetBusinessData(),
  searchAllBusinesses: new SearchAllBusinesses(),
  updateBusinessValues: new UpdateBusinessValues(),
  updateUnitValues: new UpdateUnitValues(),
};

export default businessManagingUseCases;
