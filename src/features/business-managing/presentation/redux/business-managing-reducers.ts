import getBusinessDataReducer from "./slices/get-business-data-slice";
import searchAllBusinessesReducer from "./slices/search-all-businesses-slice";
import updateBusinessValuesReducer from "./slices/update-business-values-slice";
import updateUnitValuesReducer from "./slices/update-unit-values-slice";

const businessManagingReducers = {
  getBusinessData: getBusinessDataReducer,
  searchAllBusinesses: searchAllBusinessesReducer,
  updateBusinessValues: updateBusinessValuesReducer,
  updateUnitValues: updateUnitValuesReducer,
};

export default businessManagingReducers;
