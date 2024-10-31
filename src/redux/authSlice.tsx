import { createSlice } from '@reduxjs/toolkit';
import {UserRole} from "./roles";

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    userId: 0,
    userName: '',
    userRole: UserRole.GUEST
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userRole = action.payload.userRole;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.userId = 0;
            state.userName = null;
            state.userRole = UserRole.GUEST;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
