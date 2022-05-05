import getMachineDataReducer from "./slices/get-machine-data-slice";
import searchAllMachinesReducer from "./slices/search-all-machines-slice";
import updateMachineValuesReducer from "./slices/update-machine-values-slice";

const machineManagingReducers = {
  getMachineData: getMachineDataReducer,
  searchAllMachines: searchAllMachinesReducer,
  updateMachineValues: updateMachineValuesReducer,
};

export default machineManagingReducers;
