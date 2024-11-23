import { createSlice } from "@reduxjs/toolkit/react";

import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  activeOffice: {
    id: 0,
    status: "none",
    name: "",
  },
};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setActiveOffice: (state, action: PayloadAction<any>) => {
      state.activeOffice.id = action.payload.id;
      state.activeOffice.name = action.payload.name;
      state.activeOffice.status = "loaded";
      console.log(state, action);
    },
  },
});

export const { setActiveOffice } = storageSlice.actions;

export const storageReducer = storageSlice.reducer;
