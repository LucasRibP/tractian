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

export interface UpdateBusinessValuesState extends BaseState<boolean | null> {}

const initialState: UpdateBusinessValuesState = {
  loading: "idle",
  data: null,
};

const updateBusinessValuesSlice = createSlice({
  name: "updateBusinessValues",
  initialState,
  reducers: {
    setBusinessDataUpdatedAsNull(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBusinessValuesThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.data = false;
        state.loading = "failed";
      } else {
        state.data = true;
        state.loading = "succeeded";
      }
    });

    builder.addCase(updateBusinessValuesThunk.pending, (state) => {
      state.loading = "pending";
      state.data = null;
    });
  },
});

export const { setBusinessDataUpdatedAsNull } =
  updateBusinessValuesSlice.actions;

export default updateBusinessValuesSlice.reducer;
