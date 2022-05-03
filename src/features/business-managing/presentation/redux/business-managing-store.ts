import { configureStore } from "@reduxjs/toolkit";
import getBusinessDataReducer from "./slices/get-business-data-slice";
import searchAllBusinessesReducer from "./slices/search-all-businesses-slice";
import updateBusinessValuesReducer from "./slices/update-business-values-slice";
import updateUnitValuesReducer from "./slices/update-unit-values-slice";

export const businessManagingStore = configureStore({
  reducer: {
    getBusinessData: getBusinessDataReducer,
    searchAllBusinesses: searchAllBusinessesReducer,
    updateBusinessValues: updateBusinessValuesReducer,
    updateUnitValues: updateUnitValuesReducer,
  },
});

export type BusinessManagingStore = ReturnType<
  typeof businessManagingStore.getState
>;

export type BusinessManagingDispatch = typeof businessManagingStore.dispatch;
