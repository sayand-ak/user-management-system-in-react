import { createSlice } from "@reduxjs/toolkit";

const getStoredUserInfo = () => {
    try {
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    } catch (error) {
        console.error('Error parsing user info from local storage:', error);
        return null;
    }
};

const userInitialState = {
    userInfo: getStoredUserInfo(),
};

const userAuthSlice = createSlice({
    name: 'auth',
    initialState: userInitialState,
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

const getStoredAdminInfo = () => {
    try {
        return localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null;
    } catch (error) {
        console.error('Error parsing admin info from local storage:', error);
        return null;
    }
};

const adminInitialState = {
    adminInfo: getStoredAdminInfo(),
};

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: adminInitialState,
    reducers: {
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        adminLogout: (state) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo')
        },
    },
});

export const { setAdminCredentials, adminLogout } = adminAuthSlice.actions;
export const { setCredentials, logout } = userAuthSlice.actions;

export { adminAuthSlice, userAuthSlice };
