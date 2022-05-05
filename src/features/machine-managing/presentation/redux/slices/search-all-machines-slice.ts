import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import SearchAllMachines from "../../../domain/use-cases/search-all-machines";
import MachineHeader from "../../../../../core/types/common-entities/machine-header";

const searchAllMachinesUseCase =
  container.resolve<SearchAllMachines>("searchAllMachines");

export const searchAllMachinesThunk = createAsyncThunk(
  "searchAllMachines/searchAllMachinesThunkStatus",
  async (query: string) => {
    const res = await searchAllMachinesUseCase.execute(query);
    return res;
  }
);

export interface SearchAllMachinesState extends BaseState<MachineHeader[]> {}

const initialState: SearchAllMachinesState = {
  loading: "idle",
  data: [],
};

const searchAllMachinesSlice = createSlice({
  name: "searchAllMachines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchAllMachinesThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.loading = "failed";
      } else {
        state.data = action.payload;
        state.loading = "succeeded";
      }
    });

    builder.addCase(searchAllMachinesThunk.pending, (state) => {
      state.loading = "pending";
    });
  },
});

export default searchAllMachinesSlice.reducer;
