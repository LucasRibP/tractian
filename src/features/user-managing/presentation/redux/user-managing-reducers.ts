import getUserDataReducer from "./slices/get-user-data-slice";
import searchAllUsersReducer from "./slices/search-all-users-slice";
import updateUserValuesReducer from "./slices/update-user-values-slice";

const userManagingReducers = {
  getUserData: getUserDataReducer,
  searchAllUsers: searchAllUsersReducer,
  updateUserValues: updateUserValuesReducer,
};

export default userManagingReducers;
