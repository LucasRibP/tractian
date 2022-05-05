import { configureStore } from "@reduxjs/toolkit";
import businessManagingReducers from "../../features/business-managing/presentation/redux/business-managing-reducers";
import machineManagingReducers from "../../features/machine-managing/presentation/redux/machine-managing-reducers";
import userManagingReducers from "../../features/user-managing/presentation/redux/user-managing-reducers";

export const store = configureStore({
  reducer: {
    ...businessManagingReducers,
    ...machineManagingReducers,
    ...userManagingReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
