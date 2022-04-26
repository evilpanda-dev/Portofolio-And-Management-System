import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEducations = createAsyncThunk(
  "educations/fetchEducations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/educations", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const educationSlice = createSlice({
  name: "educations",
  initialState: {
    educationList: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [fetchEducations.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchEducations.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.educationList = action.payload;
    },
    [fetchEducations.rejected]: setError,
  },
});

export default educationSlice.reducer;
