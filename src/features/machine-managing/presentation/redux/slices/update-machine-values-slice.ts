import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import UpdateMachineValues from "../../../domain/use-cases/update-machine-values";
import MachineDataUpdate from "../../../domain/entities/machine-data-update";

const updateMachineValuesUseCase = container.resolve<UpdateMachineValues>(
  "updateMachineValues"
);

export const updateMachineValuesThunk = createAsyncThunk(
  "updateMachineValues/updateMachineValuesThunkStatus",
  async (update: MachineDataUpdate) => {
    const res = await updateMachineValuesUseCase.execute(update);
    return res;
  }
);

export interface UpdateMachineValuesState extends BaseState<boolean | null> {}

const initialState: UpdateMachineValuesState = {
  loading: "idle",
  data: null,
};

const updateMachineValuesSlice = createSlice({
  name: "updateMachineValues",
  initialState,
  reducers: {
    setMachineDataUpdatedAsNull(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMachineValuesThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.data = false;
        state.loading = "failed";
      } else {
        state.data = true;
        state.loading = "succeeded";
      }
    });

    builder.addCase(updateMachineValuesThunk.pending, (state) => {
      state.loading = "pending";
      state.data = null;
    });
  },
});

export const { setMachineDataUpdatedAsNull } = updateMachineValuesSlice.actions;

export default updateMachineValuesSlice.reducer;
