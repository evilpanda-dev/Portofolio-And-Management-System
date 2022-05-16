import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserProfile = createAsyncThunk(
    "update/userProfile",
    async (userProfileData, { rejectWithValue}) => {
      const {userId,firstName,lastName,birthDate,address,city,country,phoneNumber,aboutMe } = userProfileData;
      try {
        const profileToUpdate = {
            firstName : firstName,
            lastName : lastName,
            birthDate : birthDate,
            address : address,
            city : city,
            country : country,
            phoneNumber : phoneNumber,
            aboutMe : aboutMe
        };

     const response = await fetch(`https://localhost:5000/api/updateProfile/${userId}`, {
      method:"PATCH",
      body: JSON.stringify(profileToUpdate),
      
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


  export const uploadProfileAvatar = createAsyncThunk(
    "avatar/uploadProfileAvatar",
    async (avatarData, { rejectWithValue}) => {
      const {avatar} = avatarData;
      try {
        const response = await fetch("https://localhost:5000/api/saveAvatar", {
          method: "POST",
          body: avatar,
          headers: new Headers({
            Accept: "application/json",
          }),
          credentials: "include",
        })
  
        if (!response.ok) {
          throw new Error(response.Message);
        }

      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const deleteProfile = createAsyncThunk(
    "profile/terminateAccount",
    async (profileData, { rejectWithValue}) => {
      const {userId} = profileData;
      try {
        const response = await fetch(`https://localhost:5000/api/deleteUser/${userId}`, {
    method: 'DELETE'
  })
  
        if (!response.ok) {
          throw new Error(response.Message);
        }

      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const getPersonalProfile = createAsyncThunk(
    "profile/getProfile",
    async (profileData, { rejectWithValue}) => {
      const {userName} = profileData;
      try {
     const response = await fetch(`https://localhost:5000/api/profile/${userName}`, {
      method:"GET",
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