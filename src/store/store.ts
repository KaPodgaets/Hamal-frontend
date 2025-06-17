import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import citizensReducer from "./slices/citizensSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    citizens: citizensReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
