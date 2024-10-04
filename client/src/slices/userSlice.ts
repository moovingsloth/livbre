import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from '../actions/userActions';

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
  },
});

export default userSlice.reducer;