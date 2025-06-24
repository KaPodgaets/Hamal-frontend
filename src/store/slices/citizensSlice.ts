import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

// Types based on new authoritative OpenAPI documentation
interface CitizenResponse {
  id: number;
  streetName: string | null;
  buildingNumber: string | null;
  flatNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  familyNumber: number;
  isLonely: boolean;
  isAddressWrong: boolean;
  newStreetName: string | null;
  newBuildingNumber: string | null;
  newFlatNumber: string | null;
  phone1: string | null;
  phone2: string | null;
  phone3: string | null;
  isAnsweredTheCall: boolean;
  hasMamad: boolean;
  hasMiklatPrati: boolean;
  hasMiklatZiburi: boolean;
  hasMobilityRestriction: boolean;
  isDead: boolean;
  isLeftTheCity: boolean;
  hasTemporaryAddress: boolean;
  isTemporaryAbroad: boolean;
  temporaryStreetName: string | null;
  temporaryBuildingNumber: string | null;
  temporaryFlat: string | null;
  appearanceCount: number;
  firstAppearanceTimestamp: string | null;
  secondAppearanceTimestamp: string | null;
  thirdAppearanceTimestamp: string | null;
}

interface UpdateCitizenRequest {
  streetName: string;
  buildingNumber: string;
  flatNumber: string;
  firstName: string;
  lastName: string;
  familyNumber: number;
  isLonely: boolean;
  isAddressWrong: boolean;
  newStreetName: string | null;
  newBuildingNumber: string | null;
  newFlatNumber: string | null;
  phone1: string | null;
  phone2: string | null;
  phone3: string | null;
  isAnsweredTheCall: boolean;
  hasMamad: boolean;
  hasMiklatPrati: boolean;
  hasMiklatZiburi: boolean;
  hasMobilityRestriction: boolean;
  isDead: boolean;
  isLeftTheCity: boolean;
  hasTemporaryAddress: boolean;
  isTemporaryAbroad: boolean;
  temporaryStreetName: string | null;
  temporaryBuildingNumber: string | null;
  temporaryFlat: string | null;
}

interface CitizensState {
  currentCitizen: CitizenResponse | null;
  queueIsEmpty: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CitizensState = {
  currentCitizen: null,
  queueIsEmpty: false,
  loading: false,
  error: null,
};

// Async thunk for getting next citizen
export const getNextCitizenThunk = createAsyncThunk(
  "citizens/getNext",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<CitizenResponse>("/api/Citizens/next");

      // If status is 200, return the citizen data
      if (response.status === 200) {
        return response.data;
      }

      // If status is 204, return null to indicate empty queue
      if (response.status === 204) {
        return null;
      }

      return rejectWithValue("Unexpected response status");
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as { data?: { message?: string } })?.data
              ?.message || "Failed to get next citizen"
          : "Failed to get next citizen";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for updating citizen
export const updateCitizenThunk = createAsyncThunk(
  "citizens/update",
  async (
    { id, data }: { id: number; data: UpdateCitizenRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/api/Citizens/${id}`, data);

      if (response.status === 200) {
        return response.data;
      }

      return rejectWithValue("Failed to update citizen");
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as { data?: { message?: string } })?.data
              ?.message || "Failed to update citizen"
          : "Failed to update citizen";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for posting 106 case
export const post106CaseThunk = createAsyncThunk(
  "citizens/post106Case",
  async (payload: { id: number; caseNumber: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/Citizens/106-case", payload);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      return rejectWithValue("Failed to post 106 case");
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as { data?: { message?: string } })?.data
              ?.message || "Failed to post 106 case"
          : "Failed to post 106 case";
      return rejectWithValue(errorMessage);
    }
  }
);

// Citizens slice
const citizensSlice = createSlice({
  name: "citizens",
  initialState,
  reducers: {
    clearCurrentCitizen: (state) => {
      state.currentCitizen = null;
      state.queueIsEmpty = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get next citizen
      .addCase(getNextCitizenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getNextCitizenThunk.fulfilled,
        (state, action: PayloadAction<CitizenResponse | null>) => {
          state.loading = false;
          if (action.payload) {
            state.currentCitizen = action.payload;
            state.queueIsEmpty = false;
          } else {
            state.currentCitizen = null;
            state.queueIsEmpty = true;
          }
          state.error = null;
        }
      )
      .addCase(getNextCitizenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update citizen
      .addCase(updateCitizenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCitizenThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCitizenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Post 106 case
      .addCase(post106CaseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(post106CaseThunk.fulfilled, (state) => {
        state.loading = false;
        state.currentCitizen = null;
        state.error = null;
      })
      .addCase(post106CaseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentCitizen, clearError } = citizensSlice.actions;
export default citizensSlice.reducer;
