import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "../../axios";
import type { PayloadAction } from "@reduxjs/toolkit";

export const createOffice: any = createAsyncThunk(
  "/api/office",
  async ({ name, address }: any, { rejectWithValue }: any) => {
    return await axios
      .post(`/api/office`, { name: name, address: address })
      .then((res: any) => {
        return { payload: res.data };
      })
      .catch((e: any) => {
        return rejectWithValue({ data: e.response.data });
      });
  }
);

export const getOffice: any = createAsyncThunk("/api/office/get", async () => {
  console.log("get");
  const { data } = await axios.get("/api/office");
  console.log(data);
  return data;
});

const initialState = {
  offices: [],
  add: {
    status: "none",
  },
  get: {
    status: "none",
  },
};

const officeSlice = createSlice({
  name: "office",
  initialState,
  reducers: {
    setRedirectPath: (state, action: PayloadAction<any>) => {
      console.log(state, action);
      //state.rederectPath.value = action.payload.location;
    },
  },
  extraReducers: (builder) => {
    // *createOffice
    builder.addCase(createOffice.pending, (state) => {
      state.add.status = "loading";
    });
    builder.addCase(createOffice.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.add.status = "loaded";
    });
    builder.addCase(createOffice.rejected, (state, { payload }) => {
      payload.data.errors.map((v: any) => {
        console.log(v);
      });
      state.add.status = "error";
    });

    // *getUser
    builder.addCase(getOffice.pending, (state) => {
      state.get.status = "loading";
    });
    builder.addCase(getOffice.fulfilled, (state, { payload }) => {
      state.offices = payload.offices;
      state.get.status = "loaded";
    });
    builder.addCase(getOffice.rejected, (state) => {
      state.get.status = "error";
    });
  },
});

export const { setRedirectPath } = officeSlice.actions;

export const officeReducer = officeSlice.reducer;
