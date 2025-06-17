import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

// Types
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: number;
}

interface AuthState {
  token: string | null;
  role: number | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role")
    ? parseInt(localStorage.getItem("role")!)
    : null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<LoginResponse>(
        "/api/Auth/login",
        credentials
      );
      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as { data?: { message?: string } })?.data
              ?.message || "Login failed"
          : "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.role = action.payload.role;
          state.error = null;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("role", action.payload.role.toString());
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
