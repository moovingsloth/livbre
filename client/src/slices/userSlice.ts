import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, logoutUser } from '../actions/userActions';

interface UserState {
  user: {
    _id: string;
    googleId: string;
    __v: number;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export default userSlice.reducer;