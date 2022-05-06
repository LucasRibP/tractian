import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import GetMachinesAvaliableForUser from "../../../domain/use-cases/get-machines-avaliable-for-user";
import User from "../../../domain/entities/user";
import MachineHeader from "../../../../../core/types/common-entities/machine-header";

const getMachinesAvaliableForUserUseCase =
  container.resolve<GetMachinesAvaliableForUser>("getMachinesAvaliableForUser");

export const getMachinesAvaliableForUserThunk = createAsyncThunk(
  "getMachinesAvaliableForUser/getMachinesAvaliableForUserThunkStatus",
  async (user: User) => {
    const res = await getMachinesAvaliableForUserUseCase.execute(user);
    return res;
  }
);

export interface GetMachinesAvaliableForUserState
  extends BaseState<MachineHeader[]> {}

const initialState: GetMachinesAvaliableForUserState = {
  loading: "idle",
  data: [],
};

const getMachinesAvaliableForUserSlice = createSlice({
  name: "getMachinesAvaliableForUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMachinesAvaliableForUserThunk.fulfilled,
      (state, action) => {
        if (isFailure(action.payload)) {
          state.error = action.payload.failureMessage;
          state.loading = "failed";
        } else {
          state.data = action.payload;
          state.loading = "succeeded";
        }
      }
    );

    builder.addCase(getMachinesAvaliableForUserThunk.pending, (state) => {
      state.loading = "pending";
    });
  },
});

export default getMachinesAvaliableForUserSlice.reducer;
