import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (loginData, { rejectWithValue }) => {
    const { email, password } = loginData;
    try {
      const userToLogin = {
        email: email,
        password: password
      };
      const response = await fetch("https://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userToLogin),
      })

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.Message);
      }

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);