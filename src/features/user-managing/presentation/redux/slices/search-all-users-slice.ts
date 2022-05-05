import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseState from "../../../../../core/redux/base-state";
import { isFailure } from "../../../../../core/error/failures";
import { container } from "../../../../../dependency-injections";
import SearchAllUsers from "../../../domain/use-cases/search-all-users";
import UserName from "../../../../../core/types/common-entities/user-name";

const searchAllUsersUseCase =
  container.resolve<SearchAllUsers>("searchAllUsers");

export const searchAllUsersThunk = createAsyncThunk(
  "searchAllUsers/searchAllUsersThunkStatus",
  async (query: string) => {
    const res = await searchAllUsersUseCase.execute(query);
    return res;
  }
);

export interface SearchAllUsersState extends BaseState<UserName[]> {}

const initialState: SearchAllUsersState = {
  loading: "idle",
  data: [],
};

const searchAllUsersSlice = createSlice({
  name: "searchAllUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchAllUsersThunk.fulfilled, (state, action) => {
      if (isFailure(action.payload)) {
        state.error = action.payload.failureMessage;
        state.loading = "failed";
      } else {
        state.data = action.payload;
        state.loading = "succeeded";
      }
    });

    builder.addCase(searchAllUsersThunk.pending, (state) => {
      state.loading = "pending";
    });
  },
});

export default searchAllUsersSlice.reducer;
