import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
      try {
        // Use your API endpoint to delete the product
        await axios.delete(`http://localhost:3000/v1/products/${id}`);
        
        return id;
      } catch (error) {
        console.warn(error);
        return rejectWithValue("Error");
      }
    }
  );
export const fetchAllProducts = createAsyncThunk('products/getAllProducts', async (_, { rejectWithValue }) => {
    try {
        const products = await axios.get('http://localhost:3000/v1/products')
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
                state.products = action.payload.data;
 
                state.status = 'fulfilled'
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                  (product) => product._id !== action.payload.data
                );
                state.status = 'fulfilled';
              })
    }
})

export default productsSlice.reducer
export { deleteProduct }


// export const {Adduser} = UserSlice.actions
