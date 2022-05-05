import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import UserDataUpdate from "../../../domain/entities/user-data-update";
import UpdateUserValues from "../../../domain/use-cases/update-user-values";

const updateUserValuesUseCase =
  container.resolve<UpdateUserValues>("updateUserValues");

export const updateUserValuesThunk = createAsyncThunk(
  "updateUserValues/updateUserValuesThunkStatus",
  async (update: UserDataUpdate) => {
    const res = await updateUserValuesUseCase.execute(update);
    return res;
  }
);

export interface UpdateUserValuesState extends BaseState<boolean | null> {}

const initialState: UpdateUserValuesState = {
  loading: "idle",
  data: null,
};

const updateUserValuesSlice = createSlice({
  name: "updateUserValues",
  initialState,
  reducers: {
    setUserDataUpdatedAsNull(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserValuesThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.data = false;
        state.loading = "failed";
      } else {
        state.data = true;
        state.loading = "succeeded";
      }
    });

    builder.addCase(updateUserValuesThunk.pending, (state) => {
      state.loading = "pending";
      state.data = null;
    });
  },
});

export const { setUserDataUpdatedAsNull } = updateUserValuesSlice.actions;

export default updateUserValuesSlice.reducer;
