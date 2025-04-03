import { createSlice } from '@reduxjs/toolkit';
import { bookTimeSlot, getMyBookings, cancelBooking } from '../actions/bookTimeSlotAction';

const initialState = {
    bookings: [],
    loading: false,
    error: null,
    currentBooking: null
};

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        clearBookingError: (state) => {
            state.error = null;
        },
        clearCurrentBooking: (state) => {
            state.currentBooking = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Book Time Slot
            .addCase(bookTimeSlot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bookTimeSlot.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(bookTimeSlot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get My Bookings
            .addCase(getMyBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(getMyBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Cancel Booking
            .addCase(cancelBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearBookingError, clearCurrentBooking } = bookingSlice.actions;

export default bookingSlice.reducer; 