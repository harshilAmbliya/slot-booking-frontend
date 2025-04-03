import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../config/axiosInterceptor";
import axios from "axios";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (_, { }) => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        console.log("response", response);

        return response.data
    } catch (error) {
        throw error;
    }
});

export const getUserById = createAsyncThunk("users/getUserById", async (id, { }) => {
    try {
        const response = await axiosInterceptor.get(`/users/${id}`);
        console.log("response", response);

        return response.data

    } catch (error) {
        throw error;
    }
})


export const createUser = createAsyncThunk("users/createUser", async (user, { }) => {
    try {
        const response = await axiosInterceptor.post("/users", user);
        console.log("response", response);

        return response.data
    } catch (error) {
        throw error;    
    }
})

export const updateUser = createAsyncThunk("users/updateUser", async (user, { }) => {
    try {
        const response = await axiosInterceptor.put(`/users/${user.id}`, user);
        console.log("response", response);

        return response.data
    } catch (error) {
        throw error;
    }
})

export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { }) => {
    try {
        const response = await axiosInterceptor.delete(`/users/${id}`);     
        console.log("response", response);

        return response.data
    } catch (error) {
        throw error;
    }
})

