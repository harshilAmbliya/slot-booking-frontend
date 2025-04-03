import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../config/axiosInterceptor";

export const bookTimeSlot = createAsyncThunk("bookings/bookTimeSlot", async (payload, { }) => {
    const { timeSlotId, ...rest } = payload;
   
    try {
        const response = await axiosInterceptor.post(`/time_slots/${timeSlotId}/book`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
);

export const getMyBookings = createAsyncThunk("bookings/getMyBookings", async (_, { }) => {
    try {
        const response = await axiosInterceptor.get("/bookings");
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const cancelBooking = createAsyncThunk("bookings/cancelBooking", async (bookingId, { }) => {
    try {
        const response = await axiosInterceptor.delete(`/bookings/${bookingId}/cancel`);
        return response;
    } catch (error) {
        throw error;
    }
});
