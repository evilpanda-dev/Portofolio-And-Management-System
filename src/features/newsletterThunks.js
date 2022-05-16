import { createAsyncThunk } from "@reduxjs/toolkit";

export const subscribeToNewsletter = createAsyncThunk(
  "newsletter/addEmail",
  async (newsletterData, { rejectWithValue }) => {
    const { userId, email } = newsletterData;
    try {
      const emailToSubscribe = {
        userId: userId,
        email: email
      };

      const response = await fetch(`https://localhost:5000/api/subscribeToNewsletter/${userId}`, {
        method: "POST",
        body: JSON.stringify(emailToSubscribe),

        headers: new Headers({
          "Content-Type": "application/json",
        }),

      })

      if (!response.ok) {
        throw new Error(response.Message);
      }

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkIfEmailIsSubscribed = createAsyncThunk(
  "newsletter/getEmail",
  async (newsletterData, { rejectWithValue }) => {
    const { userId } = newsletterData;
    try {
      const response = await fetch(`https://localhost:5000/api/checkEmail/${userId}`, {
        method: "GET",
      })
        .then(response => {
          return response
        })

      if (!response.ok) {
        throw new Error(response.Message);
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);