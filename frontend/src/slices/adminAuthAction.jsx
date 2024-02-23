import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginAdminAsync = createAsyncThunk("admin/login", async({username, password})=>{
    const response = await axios.post("/api/admin/login", { username, password });
    return response.data; 
});

const getUserData = createAsyncThunk("/admin/getUserData", async() => {
    const response = await axios.get("/api/admin/getUserData");
    return response.data;
})

const addUser = createAsyncThunk("/admin/addUser", async(formData) => {
    const response = await axios.post("/api/admin/addUser", formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
})

const updateUserData = createAsyncThunk("/admin/updateUser", async(formData) => {
    const response = await axios.put("/api/admin/updateUser", formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    console.log(response.data);
    return response.data;
})
export {loginAdminAsync, getUserData, addUser, updateUserData};