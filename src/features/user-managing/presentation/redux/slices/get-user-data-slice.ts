import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import GetUserData from "../../../domain/use-cases/get-user-data";
import User from "../../../domain/entities/user";

const getUserDataUseCase = container.resolve<GetUserData>("getUserData");

export const getUserDataThunk = createAsyncThunk(
  "getUserData/getUserDataThunkStatus",
  async (id: number) => {
    const res = await getUserDataUseCase.execute(id);
    return res;
  }
);

export interface GetUserDataState extends BaseState<User> {}

const initialState: GetUserDataState = {
  loading: "idle",
};

const getUserDataSlice = createSlice({
  name: "getUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.loading = "failed";
      } else {
        state.data = action.payload;
        state.loading = "succeeded";
      }
    });

    builder.addCase(getUserDataThunk.pending, (state) => {
      state.loading = "pending";
    });
  },
});

export default getUserDataSlice.reducer;
