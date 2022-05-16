import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://localhost:5000/api/skills", {
        method: "GET",
      })

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
      const response = await fetch("https://localhost:5000/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skill),
      });

      if (!response.ok) {
        throw new Error("Can't add skill. Something went wrong!");
      }

      const data = await response.json();

      dispatch(setSkill(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSkillRange = createAsyncThunk(
  "skills/updateSkill",
  async (skillData, { rejectWithValue, dispatch }) => {
    const { skillName, skillRange } = skillData;
    try {
      const response = await fetch(`https://localhost:5000/api/updateSkill/${skillName}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: skillName,
          range: skillRange,
        }),

        headers: new Headers({
          "Content-Type": "application/json",
        }),

      })
      if (!response.ok) {
        throw new Error("Can't update the skill. Something went wrong!");
      }
      dispatch(updateSkill({ name: skillName, range: skillRange }))
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeSkill = createAsyncThunk(
  "skills/removeSkill",
  async (skillData, { rejectWithValue, dispatch }) => {
    const { skillName, skillRange } = skillData;
    try {

      const response = await fetch(`https://localhost:5000/api/deleteSkill/${skillName}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error("Can't remove skill. Something went wrong!");
      }

      dispatch(deleteSkill(skillName));
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
    deleteSkill: (state, action) => {
      //find index of the value for being deleted
      const index = state.skills.findIndex(skill => skill.name === action.payload);
      //remove the value from the array
      if (index !== -1) {
        state.skills.splice(index, 1);
      }
    },
    updateSkill: (state, action) => {
      state.skills.map((skill) => {
        if (skill.name === action.payload.name) {
          skill.range = action.payload.range;
        }
      })
    }
  },
  extraReducers: {
    [fetchSkills.pending]: (state) => {
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

const { setSkill, deleteSkill, updateSkill } = skillSlice.actions;


export const selectSkill = (state) => state?.skill;

export default skillSlice.reducer;
