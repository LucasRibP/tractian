import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import businessManagingUseCases from "../../../domain/use-cases/business-managing-use-cases";
import { isFailure } from "../../../../../core/error/failures";
import BusinessDataUpdate from "../../../domain/entities/business-data-update";

export const updateBusinessValuesThunk = createAsyncThunk(
  "updateBusinessValues/updateBusinessValuesThunkStatus",
  async (update: BusinessDataUpdate) => {
    const res = await businessManagingUseCases.updateBusinessValues.execute(
      update
    );
    return res;
  }
);

export interface UpdateBusinessValuesState extends BaseState {
  updated: boolean | null;
}

const initialState: UpdateBusinessValuesState = {
  loading: "idle",
  updated: null,
};

const updateBusinessValuesSlice = createSlice({
  name: "updateBusinessValues",
  initialState,
  reducers: {
    setBusinessDataUpdatedAsNull(state) {
      state.updated = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBusinessValuesThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.updated = false;
        state.loading = "failed";
      } else {
        state.updated = true;
        state.loading = "succeeded";
      }
    });

    builder.addCase(updateBusinessValuesThunk.pending, (state) => {
      state.loading = "pending";
      state.updated = null;
    });
  },
});

export default updateBusinessValuesSlice.reducer;
