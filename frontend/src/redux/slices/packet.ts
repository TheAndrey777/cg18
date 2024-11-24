import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "../../axios";
import type { PayloadAction } from "@reduxjs/toolkit";

export const sendPacket: any = createAsyncThunk(
  "/api/packet/send",
  async ({ officeId, floorplan }: any, { rejectWithValue }: any) => {
    return await axios
      .put(`/api/office/${officeId}`, { floorplan: JSON.stringify(floorplan) })
      .then((res: any) => {
        return { payload: res.data };
      })
      .catch((e: any) => {
        return rejectWithValue({ data: e.response.data });
      });
  }
);

const initialState = {
  tails: [],
  components: [],
  walls: [],
  objects: [],
  add: {
    status: "none",
  },
  get: {
    status: "none",
  },
};

const packetSlice = createSlice({
  name: "packet",
  initialState,
  reducers: {
    setRedirectPath: (state, action: PayloadAction<any>) => {
      //state.rederectPath.value = action.payload.location;
    },
  },
  extraReducers: (builder) => {
    // *getUser
    builder.addCase(sendPacket.pending, (state) => {
      state.get.status = "loading";
    });
    builder.addCase(sendPacket.fulfilled, (state, { payload }) => {
      state.get.status = "loaded";
    });
    builder.addCase(sendPacket.rejected, (state) => {
      state.get.status = "error";
    });
  },
});

export const { setRedirectPath } = packetSlice.actions;

export const packet = packetSlice.reducer;
