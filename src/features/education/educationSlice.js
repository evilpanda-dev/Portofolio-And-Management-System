import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEducations = createAsyncThunk(
  "educations/fetchEducations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://localhost:5000/api/educations", {
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

export const addNewEducation = createAsyncThunk(
  "educations/addNewEducation",
  async (educationData, { rejectWithValue,dispatch}) => {
    const { educationDate, educationTitle,educationDescription } = educationData;
    try {
      const education = {
        date: educationDate,
        title: educationTitle,
        text : educationDescription
      };
      const response = await fetch("https://localhost:5000/api/addEducation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(education),
      });

      if (!response.ok) {
        throw new Error("Can't add new education. Something went wrong!");
      }
      const data = await response.json();
      //dispatch(setEducation(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEducation = createAsyncThunk(
  "educations/updateEducation",
  async (educationData, { rejectWithValue,dispatch }) => {
    const { educationId,educationDate, educationTitle,educationDescription } = educationData;
    try {
      // const education = {
      //   date: educationDate,
      //   title: educationTitle,
      //   text : educationDescription
      // };
      const response = await fetch(`https://localhost:5000/api/updateEducation/${educationId}`, {
          method:"PATCH",
          body:JSON.stringify({
            date: educationDate,
        title: educationTitle,
        text : educationDescription,
         }),
          
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          
            })

            if (!response.ok) {
              throw new Error("Can't update the education. Something went wrong!");
            }

            dispatch(updateEducationState({date:educationDate,title:educationTitle,text:educationDescription}));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeEducation = createAsyncThunk(
  "educations/removeEducation",
  async (educationData, { rejectWithValue,dispatch}) => {
    const {educationId, educationDate, educationTitle,educationDescription } = educationData;
    try {
      // const education = {
      //   date: educationDate,
      //   title: educationTitle,
      //   text : educationDescription
      // };
     
const response =  await fetch(`https://localhost:5000/api/deleteEducation/${educationId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error("Can't remove the education. Something went wrong!");
      }
     // .then(response => response.json());
     dispatch(deleteEducation(educationId));
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
  reducers: {
    setEducation: (state, action) => {
      state.educationList.push(action.payload);
    },
    deleteEducation:(state,action) =>{
      //find index of the value for being deleted
      const index = state.educationList.findIndex(education => education.id === action.payload);
      //remove the value from the array
      if(index !== -1){
        state.educationList.splice(index,1);
      }
    },
    updateEducationState:(state,action) =>{
     // console.log(action.payload)
      state.educationList.map((education)=>{
        if(education.id === action.payload.id){
          education.date = action.payload.date;
          education.title = action.payload.title;
          education.text = action.payload.text;
        }
      })
  }
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
const { setEducation,updateEducationState,deleteEducation } = educationSlice.actions;
export default educationSlice.reducer;
