import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const fetchAllProducts = createAsyncThunk('products/getAllProducts', async (_, { rejectWithValue }) => {
    try {
        const products = await axios.get('http://localhost:3000/v1/products')
        console.log("hello ddddd",products.data);
        return products.data; 
    
    } catch (error) {
        console.warn(error);
        // return null
        return rejectWithValue("Error");
    }
})

const productsSlice = createSlice({
    name : "products",
    initialState : {
        products: [],
        error: '',
        status: 'idle'
    },
    reducers : { 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.error = ''
                state.products = []
                state.status = 'pending' 
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'rejected'
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.products = action.payload;
 
                state.status = 'fulfilled'
            })
    }
})

export default productsSlice.reducer


// export const {Adduser} = UserSlice.actions
