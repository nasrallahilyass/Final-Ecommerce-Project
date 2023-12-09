import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const fetchAllUsers = createAsyncThunk('Users/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const users = await axios.get('http://localhost:3000/v1/users')
        console.log("users",users.data);
        return users.data; 
    
    } catch (error) {
        console.warn(error);
        // return null
        return rejectWithValue("Error");
    }
})

constusersSlice = createSlice({
    name : "users",
    initialState : {
       users: [],
        error: '',
        status: 'idle'
    },
    reducers : { 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.error = ''
                state.products = []
                state.status = 'pending' 
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'rejected'
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.products = action.payload;
 
                state.status = 'fulfilled'
            })
    }
})

export default usersSlice.reducer


// export const {Adduser} = UserSlice.actions
