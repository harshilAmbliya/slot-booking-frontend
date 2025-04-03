import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../config/axiosInterceptor";

export const getAllTimeSlots = createAsyncThunk(
    "timeSlots/getAllTimeSlots",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptor.get("/time_slots");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getCurrentDateTimeSlots = createAsyncThunk("users/getCurrentDateTimeSlots", async ({ date }, { }) => {
    try {
        const response = await axiosInterceptor.get(`/time_slots/available?date=${date}`);
        console.log("response", response);

        return response.data
    } catch (error) {
        throw error;
    }
});

export const getTimeSlotById = createAsyncThunk(
    "timeSlots/getTimeSlotById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptor.get(`/time_slots/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createTimeSlot = createAsyncThunk(
    "timeSlots/createTimeSlot",
    async (timeSlotData, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptor.post("/time_slots", timeSlotData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateTimeSlot = createAsyncThunk(
    "timeSlots/updateTimeSlot",
    async ({ id, ...timeSlotData }, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptor.put(`/time_slots/${id}`, timeSlotData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteTimeSlot = createAsyncThunk(
    "timeSlots/deleteTimeSlot",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInterceptor.delete(`/time_slots/${id}`);
            return { id };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

