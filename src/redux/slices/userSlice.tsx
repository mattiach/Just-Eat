"use client";

import { UserFormProfile } from "@/interfaces/const";
import { initialUserProfile } from "@/lib/const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = UserFormProfile;

const getInitialUserState = (): UserState => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : initialUserProfile;
  }
  return initialUserProfile;
};

const initialState: UserState = getInitialUserState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo(state, action: PayloadAction<Partial<UserFormProfile>>) {
      const updatedState = { ...state, ...action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedState));
      }
      return updatedState;
    },
  },
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
