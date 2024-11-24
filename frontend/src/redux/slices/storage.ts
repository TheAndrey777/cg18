import { createSlice } from "@reduxjs/toolkit/react";

import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  menu: {
    activeId: 1,
  },
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
    setMenuActiveId: (state, action: PayloadAction<any>) => {
      state.menu.activeId = action.payload.id;
      console.log(state, action);
    },
  },
});

export const { setActiveOffice, setMenuActiveId } = storageSlice.actions;

export const storageReducer = storageSlice.reducer;
