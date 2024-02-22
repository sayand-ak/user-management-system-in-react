import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUserAsync = createAsyncThunk('user/login', async ({ email, password }) => {
    try {
        const response = await axios.post('/api/user/auth', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data; 
    }
});
  
export const signupUserAsync = createAsyncThunk('user/signup', async({ fname, lname, email, phone, password }) => {
    try {
        const response = await axios.post('/api/user/', { fname, lname, email, phone, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const setProfileAsync = createAsyncThunk('user/setProfile', async (formData) => {
    try {
        const response = await axios.patch('/api/user/setProfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const logoutAsync = createAsyncThunk("user/profile", async() => {
    try {
        const response = await axios.post("/api/user/logout");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
})

export const updateUerProfileAsync = createAsyncThunk("user/updateProfile", async(formData) => {
    try {
        const response = await axios.put("/api/user/profile", formData, 
        { 
            headers : {
                "Content-Type": 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
})