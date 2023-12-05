import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const fetchAllProducts = createAsyncThunk('products/getAllProducts', async (_, { rejectWithValue }) => {
    try {
        const products = await axios.get('http://localhost:3000/v1/products')
        console.log(products);
        return products.data; // Assuming the products are in the 'data' property

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
})

const productsSlice = createSlice({
    name : "products",
    initialState : {
        products: [],
        error: '',
        status: ''
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
