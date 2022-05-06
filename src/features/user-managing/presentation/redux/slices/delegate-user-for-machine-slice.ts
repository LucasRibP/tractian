import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import DelegateUserForMachine from "../../../domain/use-cases/delegate-user-for-machine";
import MachineUserDelegation from "../../../domain/entities/machine-user-delegation";

const delegateUserForMachineUseCase = container.resolve<DelegateUserForMachine>(
  "delegateUserForMachine"
);

export const delegateUserForMachineThunk = createAsyncThunk(
  "delegateUserForMachine/delegateUserForMachineThunkStatus",
  async (delegation: MachineUserDelegation) => {
    const res = await delegateUserForMachineUseCase.execute(delegation);
    return res;
  }
);

export interface DelegateUserForMachineState
  extends BaseState<boolean | null> {}

const initialState: DelegateUserForMachineState = {
  loading: "idle",
  data: null,
};

const delegateUserForMachineSlice = createSlice({
  name: "delegateUserForMachine",
  initialState,
  reducers: {
    setDelegateUserForMachineStateAsNull(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(delegateUserForMachineThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.data = false;
        state.loading = "failed";
      } else {
        state.data = true;
        state.loading = "succeeded";
      }
    });

    builder.addCase(delegateUserForMachineThunk.pending, (state) => {
      state.loading = "pending";
      state.data = null;
    });
  },
});

export const { setDelegateUserForMachineStateAsNull } =
  delegateUserForMachineSlice.actions;

export default delegateUserForMachineSlice.reducer;
