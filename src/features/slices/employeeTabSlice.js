// src/features/slices/employeeTabSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("employeeSelectedTab") || "", // dùng key riêng trong localStorage
};

export const employeeTabSlice = createSlice({
  name: "employeeSelectedTab",
  initialState,
  reducers: {
    setEmployeeTab: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("employeeSelectedTab", action.payload);
    },
  },
});

export const { setEmployeeTab } = employeeTabSlice.actions;

export default employeeTabSlice.reducer;
