import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    name: '',
    email: '',
    token: '',
    preferences: {
      categories: [],
      sources: [],
      authors: []
    }
  },
  loading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserPreferredCategories: (state, action: PayloadAction<string[]>) => {
      state.user.preferences.categories =  action.payload
    },
    setUserPreferredSources: (state, action: PayloadAction<string[]>) => {
      state.user.preferences.sources =  action.payload
    },
    setUserPreferredAuthors: (state, action: PayloadAction<string[]>) => {
      state.user.preferences.authors =  action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = { ...action.payload };
        state.loading = false;
      })
      .addCase(setUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
    });
  }
})

export const setUserInfo = createAsyncThunk(
  "user/setUserInfo",
  async (userInfo: User) => {
    return userInfo;
  }
)

export const {
  setUserPreferredCategories,
  setUserPreferredSources,
  setUserPreferredAuthors,
} = UserSlice.actions;

export default UserSlice.reducer
