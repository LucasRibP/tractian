import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import BusinessDataUpdate from "../../../domain/entities/business-data-update";
import { container } from "../../../../../dependency-injections";
import UpdateBusinessValues from "../../../domain/use-cases/update-business-values";

const updateBusinessValuesUseCase = container.resolve<UpdateBusinessValues>(
  "updateBusinessValues"
);

export const updateBusinessValuesThunk = createAsyncThunk(
  "updateBusinessValues/updateBusinessValuesThunkStatus",
  async (update: BusinessDataUpdate) => {
    const res = await updateBusinessValuesUseCase.execute(update);
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
