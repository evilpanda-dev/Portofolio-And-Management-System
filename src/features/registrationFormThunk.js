import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (registerData, { rejectWithValue }) => {
    const { userName, email, password } = registerData;
    try {
      const userToRegister = {
        userName: userName,
        email: email,
        password: password
      };
      const response = await fetch("https://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToRegister),
      })

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.Message);
      }

      //dispatch(setEducation(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);