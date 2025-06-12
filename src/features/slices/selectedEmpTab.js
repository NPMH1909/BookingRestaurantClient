import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("selectedEmpTab") || "Checkin",
};

export const selectedEmpTabSlice = createSlice({
  name: "selectedEmpTab",
  initialState,
  reducers: {
    setSelectedEmpTab: (state, action) => {
      state.value = action.payload;
      console.log(action.payload);
      localStorage.setItem("selectedEmpTab", action.payload);
    },
  },
});

export const { setSelectedEmpTab } = selectedEmpTabSlice.actions;

export default selectedEmpTabSlice.reducer;
