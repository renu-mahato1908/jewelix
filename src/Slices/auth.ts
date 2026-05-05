import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";


interface User {
  id?: number;
  username: string;
  firstName:string;
  lastName:string;
  email?: string;
  token?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

interface RegisterPayload {
  firstName:string;
  lastName:string;
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  username: string;
  password: string;
}



const user: User | null = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : null;



export const register = createAsyncThunk<
  any, // response type (you can refine)
  RegisterPayload
>("auth/register", async ({ firstName, lastName, username, email, password }, thunkAPI) => {
  try {
    const response = await AuthService.register(firstName, lastName, username, email, password);

    thunkAPI.dispatch(setMessage(response.data.message));

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      error.toString();

    thunkAPI.dispatch(setMessage(message));

    return thunkAPI.rejectWithValue(message);
  }
});



export const login = createAsyncThunk<
  { user: User },
  LoginPayload
>("auth/login", async ({ username, password }, thunkAPI) => {
  try {
    const data = await AuthService.login(username, password);

    return { user: data };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      error.toString();

    thunkAPI.dispatch(setMessage(message));

    return thunkAPI.rejectWithValue(message);
  }
});



export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});


const initialState: AuthState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
      })

      // LOGIN
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.isLoggedIn = true;
          state.user = action.payload.user;
        }
      )
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;