import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "../../axios";
import type { PayloadAction } from "@reduxjs/toolkit";

export const loginUser: any = createAsyncThunk(
  "api/auth/login",
  async ({ login, password }: any, { rejectWithValue }: any) => {
    return await axios
      .post(`api/auth/login`, { username: login, password: password })
      .then((res: any) => {
        console.log(res);
        return { payload: res.data };
      })
      .catch((e: any) => {
        return rejectWithValue({ data: e.response.data });
      });
  }
);

export const registerUser: any = createAsyncThunk(
  "api/auth/register",
  async ({ login, email, password }: any, { rejectWithValue }: any) => {
    return await axios
      .post(`api/auth/register`, {
        username: login,
        password: password,
        email: email,
      })
      .then((res: any) => {
        console.log(res);
        return { payload: res.data };
      })
      .catch((e: any) => {
        return rejectWithValue({ data: e.response.data });
      });
  }
);

export const getUser: any = createAsyncThunk("api/auth/me", async () => {
  const { data } = await axios.get("api/auth/me");
  console.log(data);
  return data;
});

const initialState = {
  id: 0,
  status: "loaded",
  isAdmin: false,
  username: "Генадий Буль",
  email: "genadybooool@gmail.ru",
  isAuthorized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRedirectPath: (state, action: PayloadAction<any>) => {
      console.log(state, action);
      //state.rederectPath.value = action.payload.location;
    },
  },
  extraReducers: (builder) => {
    // *loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isAuthorized = payload.payload.status === "success";
      state.status = "loaded";
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      payload.data.errors.map((v: any) => {
        console.log(v);
      });
      state.status = "error";
    });

    // *getUser
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isAuthorized = payload.status === "success";
      state.status = "loaded";
    });
    builder.addCase(getUser.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setRedirectPath } = userSlice.actions;

export const userReducer = userSlice.reducer;
