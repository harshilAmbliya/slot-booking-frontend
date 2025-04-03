import { createSlice } from '@reduxjs/toolkit';
import { 
    getAllTimeSlots, 
    getTimeSlotById, 
    createTimeSlot, 
    updateTimeSlot, 
    deleteTimeSlot 
} from '../actions/timeSlotAction';

const initialState = {
    timeSlots: [],
    selectedTimeSlot: null,
    loading: false,
    error: null
};

export const timeSlotSlice = createSlice({
    name: 'timeSlots',
    initialState,
    reducers: {
        clearTimeSlotError: (state) => {
            state.error = null;
        },
        setSelectedTimeSlot: (state, action) => {
            state.selectedTimeSlot = action.payload;
        },
        clearSelectedTimeSlot: (state) => {
            state.selectedTimeSlot = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Time Slots
            .addCase(getAllTimeSlots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTimeSlots.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSlots = action.payload;
            })
            .addCase(getAllTimeSlots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get Time Slot by ID
            .addCase(getTimeSlotById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTimeSlotById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTimeSlot = action.payload;
            })
            .addCase(getTimeSlotById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Create Time Slot
            .addCase(createTimeSlot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTimeSlot.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSlots.push(action.payload);
            })
            .addCase(createTimeSlot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update Time Slot
            .addCase(updateTimeSlot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTimeSlot.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.timeSlots.findIndex(slot => slot.id === action.payload.id);
                if (index !== -1) {
                    state.timeSlots[index] = action.payload;
                }
            })
            .addCase(updateTimeSlot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete Time Slot
            .addCase(deleteTimeSlot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTimeSlot.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSlots = state.timeSlots.filter(slot => slot.id !== action.payload.id);
            })
            .addCase(deleteTimeSlot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { 
    clearTimeSlotError, 
    setSelectedTimeSlot, 
    clearSelectedTimeSlot 
} = timeSlotSlice.actions;

export default timeSlotSlice.reducer; 