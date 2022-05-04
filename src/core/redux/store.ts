import { configureStore } from "@reduxjs/toolkit";
import businessManagingReducers from "../../features/business-managing/presentation/redux/business-managing-reducers";

export const store = configureStore({
  reducer: {
    ...businessManagingReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
