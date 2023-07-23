import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn: boolean;
  authToken: string | null;
  appIntro: boolean;
  guestUser: boolean;
  user: {
    id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    profile_image?: string;
    uid:string
    displayPicture?:string|null
  } | null;
  userProfile?:{
      gender?: string
      age?: string |number
      weight?: string|number
      height?: string
      goal?: string
      physical_activity_level?: string
    }|null
  
}

const initialState: UserState = {
  isLoggedIn: false,
  authToken: null,
  appIntro: false,
  user: null,
  guestUser: true,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,

  reducers: {
    updateUserState: (state, action: PayloadAction<UserState>) => {
      
      state.isLoggedIn = action.payload?.isLoggedIn;
      state.authToken = action.payload?.authToken;
      state.appIntro = action.payload?.appIntro;
      state.user = action.payload?.user;
      state.guestUser = action.payload.guestUser;
    },

    logoutUser: state => {
      state.isLoggedIn = false;
      state.authToken = null;
      state.user = null;
    },
    setAppIntro: state => {
       console.log("updating")
      state.appIntro = true;
    },
    loginUser: state => {
      state.isLoggedIn = true;
      state.guestUser = false;
      
    },
    createAccount: state => {
      state.guestUser = false;
    },
    guestLogin: state => {
      state.guestUser = true;
    },
    updateUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload?.userProfile;
    },
    updateProfilePicture:(state, action:PayloadAction<string>)=>{
      
      if (state && state.user) {
        state.user.displayPicture = action.payload;
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUserState,
  logoutUser,
  setAppIntro,
  loginUser,
  createAccount,
  guestLogin,
  updateUserProfile,
  updateProfilePicture
} = userSlice.actions;

export default userSlice.reducer;
