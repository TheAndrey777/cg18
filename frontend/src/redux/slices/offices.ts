import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "../../axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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

export const inviteUser: any = createAsyncThunk(
  "/api/office/invite",
  async ({ officeId, userId }: any, { rejectWithValue }: any) => {
    return await axios
      .post(`/api/office/${officeId}`, { workerId: userId })
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
      if (payload.payload.status == "success") {
        toast.success("Офис был успешно создан");
        state.add.status = "loaded";
      } else {
        state.add.status = "error";
      }
    });
    builder.addCase(createOffice.rejected, (state, { payload }) => {
      if (payload.data.message) toast.error(payload.data.message);
      state.add.status = "error";
    });

    // *inviteUser
    builder.addCase(inviteUser.pending, (state) => {
      state.get.status = "loading";
    });
    builder.addCase(inviteUser.fulfilled, (state, { payload }) => {
      if (payload.payload.status == "success") {
        toast.success("Пользователь добавлен в компанию");
        state.get.status = "loaded";
      } else {
        state.get.status = "error";
      }
    });
    builder.addCase(inviteUser.rejected, (state, { payload }) => {
      if (payload.data.message) toast.error(payload.data.message);
      state.get.status = "error";
    });

    // *getUser
    builder.addCase(getOffice.pending, (state) => {
      state.get.status = "loading";
    });
    builder.addCase(getOffice.fulfilled, (state, { payload }) => {
      state.offices = payload.offices;
      state.get.status = "loaded";
    });
    builder.addCase(getOffice.rejected, (state, { payload }) => {
      if (payload.data.message) toast.error(payload.data.message);
      state.get.status = "error";
    });
  },
});

export const { setRedirectPath } = officeSlice.actions;

export const officeReducer = officeSlice.reducer;
