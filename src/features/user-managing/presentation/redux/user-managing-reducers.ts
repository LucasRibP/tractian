import delegateUserForMachineReducer from "./slices/delegate-user-for-machine-slice";
import getMachinesAvaliableForUserReducer from "./slices/get-machines-avaliable-for-user-slice";
import getUserDataReducer from "./slices/get-user-data-slice";
import searchAllUsersReducer from "./slices/search-all-users-slice";
import updateUserValuesReducer from "./slices/update-user-values-slice";

const userManagingReducers = {
  getUserData: getUserDataReducer,
  searchAllUsers: searchAllUsersReducer,
  updateUserValues: updateUserValuesReducer,
  delegateUserForMachine: delegateUserForMachineReducer,
  getMachinesAvaliableForUser: getMachinesAvaliableForUserReducer,
};

export default userManagingReducers;
