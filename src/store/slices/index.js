import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import bookingReducer from './bookingSlice'
import timeSlotReducer from './timeSlotSlice'

export const rootReducer = combineReducers({
  users: userReducer,
  bookings: bookingReducer,
  timeSlots: timeSlotReducer
});

