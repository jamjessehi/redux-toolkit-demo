import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  confirmPassword: ""
};

const slice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    onFiledChanged: (state, action) => {
      const { filed, value } = action.payload;
      state[filed] = value;
    }
  }
});

export const { onFiledChanged } = slice.actions;

export const selectSign = state => state.sign || initialState;

export default slice.reducer;
