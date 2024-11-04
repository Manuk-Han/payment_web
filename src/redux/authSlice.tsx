import { createSlice } from '@reduxjs/toolkit';
import { UserRole } from './roles';

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    userId: 0,
    userName: '',
    userRole: UserRole.GUEST,
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
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('userName', action.payload.userName);
            localStorage.setItem('userRole', action.payload.userRole);
            localStorage.setItem('userId', String(action.payload.userId));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.userId = 0;
            state.userName = '';
            state.userRole = UserRole.GUEST;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userId');
        },
        checkLoginStatus: (state) => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const userName = localStorage.getItem('userName');
            const userRole = localStorage.getItem('userRole');
            const userId = localStorage.getItem('userId');

            if (accessToken && refreshToken && userName && userRole && userId) {
                state.isAuthenticated = true;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.userName = userName;
                state.userRole = userRole as UserRole;
                state.userId = Number(userId);
            }
        },
    },
});

export const { setCredentials, logout, checkLoginStatus } = authSlice.actions;
export default authSlice.reducer;
