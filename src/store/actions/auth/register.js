import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "@/config/axiosInterceptor";

export const register = createAsyncThunk("users/register", async (user, { }) => {
    try {
        const response = await axiosInterceptor.post("/auth/register", user);

        return response.data
    } catch (error) {
        throw error;
    }
})