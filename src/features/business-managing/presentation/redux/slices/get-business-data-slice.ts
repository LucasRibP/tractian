import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Business from "../../../domain/entities/business";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import GetBusinessData from "../../../domain/use-cases/get-business-data";

const getBusinessDataUseCase =
  container.resolve<GetBusinessData>("getBusinessData");

export const getBusinessDataThunk = createAsyncThunk(
  "getBusinessData/getBusinessDataThunkStatus",
  async (id: number) => {
    const res = await getBusinessDataUseCase.execute(id);
    return res;
  }
);

export interface GetBusinessDataState extends BaseState<Business> {}

const initialState: GetBusinessDataState = {
  loading: "idle",
};

const getBusinessDataSlice = createSlice({
  name: "getBusinessData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBusinessDataThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.loading = "failed";
      } else {
        state.data = action.payload;
        state.loading = "succeeded";
      }
    });

    builder.addCase(getBusinessDataThunk.pending, (state) => {
      state.loading = "pending";
    });
  },
});

export default getBusinessDataSlice.reducer;
