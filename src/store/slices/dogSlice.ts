import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dogs: undefined,
};

export const dogSlice = createSlice({
  initialState,
  name: "dogSlice",
  reducers: {},
});

export default dogSlice.reducer;

export const {} = dogSlice.actions;
