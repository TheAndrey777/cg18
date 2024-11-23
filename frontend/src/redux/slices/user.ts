import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/react";
import axios from "../../axios";
import type { PayloadAction } from "@reduxjs/toolkit";

export const loginUser: any = createAsyncThunk(
  "api/auth/login",
  async (_, { rejectWithValue, getState }: any) => {
    const { user } = getState() as { user: UserState };

    return await axios
      .post(`api/auth/login`, { username: user.login, password: user.password })
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
  async (_, { rejectWithValue, getState }: any) => {
    const { user } = getState() as { user: UserState };

    return await axios
      .post(`api/auth/register`, {
        username: user.login,
        password: user.password,
        email: user.email,
        name: user.name,
        surname: user.surname,
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

interface UserState {
  id: number;
  status: string;
  isAdmin: boolean;
  name: string;
  surname: string;
  email: string;
  isAuthorized: boolean;
  password: string;
  login: string;
}

const initialState: UserState = {
  id: 0,
  status: "loaded",
  isAdmin: false,
  name: "Генадий",
  surname: "Буль",
  email: "genadybooool@gmail.ru",
  isAuthorized: false,
  password: "123",
  login: "booool",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRedirectPath: (state, action: PayloadAction<any>) => {
      console.log(state, action);
      //state.rederectPath.value = action.payload.location;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
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

    // *registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isAuthorized = payload.payload.status === "success";
      state.status = "loaded";
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
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

export const {
  setRedirectPath,
  setEmail,
  setLogin,
  setName,
  setPassword,
  setSurname,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
