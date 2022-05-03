import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import businessManagingUseCases from "../../../domain/use-cases/business-managing-use-cases";
import { isFailure } from "../../../../../core/error/failures";
import BusinessName from "../../../domain/entities/business-name";

export const searchAllBusinessesThunk = createAsyncThunk(
  "searchAllBusinesses/searchAllBusinessesThunkStatus",
  async (query: string) => {
    const res = await businessManagingUseCases.searchAllBusinesses.execute(
      query
    );
    return res;
  }
);

export interface SearchAllBusinessesState extends BaseState {
  data: BusinessName[];
}

const initialState: SearchAllBusinessesState = {
  loading: "idle",
  data: [],
};

const searchAllBusinessesSlice = createSlice({
  name: "searchAllBusinesses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchAllBusinessesThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.loading = "failed";
      } else {
        state.data = action.payload;
        state.loading = "succeeded";
      }
    });

    builder.addCase(searchAllBusinessesThunk.pending, (state) => {
      state.loading = "pending";
    });
  },
});

export default searchAllBusinessesSlice.reducer;
