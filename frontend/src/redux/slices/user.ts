import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "../../axios";
import type { PayloadAction } from "@reduxjs/toolkit";

export const loginUser: any = createAsyncThunk(
  "api/auth/login",
  async ({ login, password }: any, { rejectWithValue }: any) => {
    return await axios
      .post(`api/auth/login`, { username: login, password: password })
      .then((res: any) => {
        return { payload: res.data };
      })
      .catch((e: any) => {
        return rejectWithValue({ data: e.response.data });
      });
  }
);

export const getUser: any = createAsyncThunk("api/auth/me", async () => {
  const { data } = await axios.get("api/auth/me");
  return data;
});

const initialState = {
  id: {
    value: 0,
    status: "",
  },
  username: {
    value: "",
    status: "",
  },
  isAdmin: {
    value: true,
    status: "",
  },
  isAuthorized: {
    value: false,
    status: "",
  },
  rederectPath: {
    value: "/admin-panel/about",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRedirectPath: (state, action: PayloadAction<any>) => {
      state.rederectPath.value = action.payload.location;
    },
  },
  extraReducers: (builder) => {
    // *loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isAuthorized.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isAuthorized.value = payload.payload.status === "success";
      state.isAuthorized.status = "loaded";
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      payload.data.errors.map((v: any) => {});
      state.isAuthorized.status = "error";
    });

    // *getUser
    builder.addCase(getUser.pending, (state) => {
      state.isAuthorized.status = "loading";
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isAuthorized.value = payload.status === "success";
      state.isAuthorized.status = "loaded";
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isAuthorized.status = "error";
    });
  },
});

export const { setRedirectPath } = userSlice.actions;

export const userReducer = userSlice.reducer;
