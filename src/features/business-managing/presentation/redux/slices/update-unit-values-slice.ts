import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import UnitDataUpdate from "../../../domain/entities/unit-data-update";
import { container } from "../../../../../dependency-injections";
import UpdateUnitValues from "../../../domain/use-cases/update-unit-values";

const updateUnitValuesUseCase =
  container.resolve<UpdateUnitValues>("updateUnitValues");

export const updateUnitValuesThunk = createAsyncThunk(
  "updateUnitValues/updateUnitValuesThunkStatus",
  async (update: UnitDataUpdate) => {
    const res = await updateUnitValuesUseCase.execute(update);
    return res;
  }
);

export interface UpdateUnitValuesState extends BaseState {
  updated: boolean | null;
}

const initialState: UpdateUnitValuesState = {
  loading: "idle",
  updated: null,
};

const updateUnitValuesSlice = createSlice({
  name: "getUnitData",
  initialState,
  reducers: {
    setUnitDataUpdatedAsNull(state) {
      state.updated = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUnitValuesThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.updated = false;
        state.loading = "failed";
      } else {
        state.updated = true;
        state.loading = "succeeded";
      }
    });

    builder.addCase(updateUnitValuesThunk.pending, (state) => {
      state.loading = "pending";
      state.updated = null;
    });
  },
});

export default updateUnitValuesSlice.reducer;
