import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import GetMachineData from "../../../domain/use-cases/get-machine-data";
import Machine from "../../../domain/entities/machine";

const getMachineDataUseCase =
  container.resolve<GetMachineData>("getMachineData");

export const getMachineDataThunk = createAsyncThunk(
  "getMachineData/getMachineDataThunkStatus",
  async (id: number) => {
    const res = await getMachineDataUseCase.execute(id);
    return res;
  }
);

export interface GetMachineDataState extends BaseState<Machine> {}

const initialState: GetMachineDataState = {
  loading: "idle",
};

const getMachineDataSlice = createSlice({
  name: "getMachineData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMachineDataThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.loading = "failed";
      } else {
        state.data = action.payload;
        state.loading = "succeeded";
      }
    });

    builder.addCase(getMachineDataThunk.pending, (state) => {
      state.loading = "pending";
    });
  },
});

export default getMachineDataSlice.reducer;
