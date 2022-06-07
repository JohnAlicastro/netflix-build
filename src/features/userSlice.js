import { createSlice } from '@reduxjs/toolkit';

/* CREATE THE userSlice IN THE REDUX STORE */
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions //
  reducers: {
    // LOGIN ACTION //
    login: (state, action) => {
      state.user = action.payload;
    },
    // LOGOUT ACTION //
    logout: (state) => {
      state.user = null;
    },
  },
});

/* EXPORT ACTIONS FROM userSlice reducers */
export const { login, logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from //
// the state. Selectors can also be defined inline where they're used instead of //
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)` //

/* EXPORT selectUser FUNCTION ALLOWS US TO ACCESS THE USER VALUE FROM THE userSlice IN THE STORE */
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
