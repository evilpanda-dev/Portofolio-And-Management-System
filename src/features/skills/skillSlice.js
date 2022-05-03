import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, { rejectWithValue,dispatch }) => {
    try {
      const response = await fetch("https://localhost:5000/api/skills", {
        method: "GET",
      }) 
      // .then(res =>{
      //   const skills = res.data
      //   console.log(response)
      //   dispatch(setSkill(skills));
      // })

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();
      // dispatch(setSkill(data));
      // console.log(data)
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
        throw new Error("Can't add skill. Server error");
      }

      const data = await response.json();

      dispatch(setSkill(data));
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
     
 await fetch(`https://localhost:5000/api/deleteSkill/${skillName}`, {
        method: 'DELETE'
      })
     // .then(response => response.json());

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
    deleteSkill:(state,action) =>{
      //find index of the value for being deleted
      const index = state.skills.findIndex(skill => skill.name === action.payload);
      //remove the value from the array
      if(index !== -1){
        state.skills.splice(index,1);
      }
    }
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

const { setSkill,deleteSkill } = skillSlice.actions;


export const selectSkill = (state) => state?.skill;

export default skillSlice.reducer;
