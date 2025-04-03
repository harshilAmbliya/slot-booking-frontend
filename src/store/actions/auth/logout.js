import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk("auth/logout", async (payload, { }) => {
    try {
        // const response = await axiosInterceptor.post(`/auth/logout`, payload);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        localStorage.clear();
        window.location.href = "/signin";
    } catch (error) {
        throw error;
    }
});