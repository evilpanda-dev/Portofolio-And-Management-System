import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/skills", {
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

export const addNewSkill = createAsyncThunk(
  "skills/addNewSkill",
  async (skillData, { rejectWithValue, dispatch }) => {
    const { skillName, skillRange } = skillData;
    try {
      const skill = {
        name: skillName,
        range: skillRange,
      };
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-name": "application/json",
        },
        body: JSON.stringify(skill),
      });

      if (!response.ok) {
        throw new Error("Can't add skill. Server error");
      }

      const data = await response.json();

      dispatch(setSkill(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    status: null,
    error: null,
  },
  reducers: {
    setSkill: (state, action) => {
      state.skills.push(action.payload);
    },
  },
  extraReducers: {
    [fetchSkills.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchSkills.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.name = action.payload;
    },
    [fetchSkills.rejected]: setError,
  },
});

const { setSkill } = skillSlice.actions;

export const selectSkill = (state) => state?.skill;

export default skillSlice.reducer;
