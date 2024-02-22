import { createSlice } from "@reduxjs/toolkit";

const getStoredUserInfo = () => {
    try {
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    } catch (error) {
        console.error('Error parsing user info from local storage:', error);
        return null;
    }
};

const initialState = {
    userInfo: getStoredUserInfo(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        },
    },
});

export const{setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;