import { createSlice } from "@reduxjs/toolkit";
import { createJWT } from "../utils/jwtUtils";

const initialState = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddNewUser: (state, action) => {
      if (
        state.some((item) => {
          return item.email == action.payload.email;
        })
      ) {
        alert("User already exist");
      } else {
        state.push(action.payload);
      }
    },

    MatchUserDetails: (state, action) => {
      const { email, password } = action.payload;
      const user = state.find((item) => {
        return item.email === email && item.password === password;   //find user in the usertodo array
      });
      const payload = { 
          ...user,
        };
      
      if (!user) {
        throw new Error("Email or password are Incorrect ");  // Give error if no user is find
      }

      const token = createJWT(payload, "@man12345");  // create JWT token  
      localStorage.setItem('token', token);  // set token in local storage
    },
  }
  });



export const { AddNewUser, MatchUserDetails } = userSlice.actions;
export default userSlice.reducer;
