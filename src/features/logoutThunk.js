import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk(
    "logout/logoutUser",
    async (_, { rejectWithValue}) => {
      try {
        
       const response =  await fetch("https://localhost:5000/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
  
    const data = await response.json();
        if (!response.ok) {
          throw new Error(data.Message);
        }

      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );