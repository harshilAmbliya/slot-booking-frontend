import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "@/config/axiosInterceptor";

export const loginUser = createAsyncThunk("auth/loginUser", async (payload, { }) => {
    try {
        const response = await axiosInterceptor.post(`/auth/login`, payload);
        localStorage.setItem("auth_token", response?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
        localStorage.setItem("role", response?.data?.data?.user?.role);
        window.location.href = "/";
        return response.data;
    } catch (error) {
        throw error;
    }
});