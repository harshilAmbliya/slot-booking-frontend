import { getAllUsers } from '@/store/actions/userAction';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: null,
    timeSlots: [],
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                return action.payload;
            })

    },
})

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer