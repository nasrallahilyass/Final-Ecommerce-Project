import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deletecategorie = createAsyncThunk(
    'categorie/deletecategorie',
    async (id, { rejectWithValue }) => {
      try {
        // Use your API endpoint to delete the product
        await axios.delete(`http://localhost:3000/v1/categorie/${id}`);
        
        return id;
      } catch (error) {
        console.warn(error);
        return rejectWithValue("Error");
      }
    }
  );
export const fetchAllcategories = createAsyncThunk('categories/getAllcategories', async (_, { rejectWithValue }) => {
    try {
        const categories = await axios.get('http://localhost:3000/v1/categories')
        return categories.data; 

    } catch (error) {
        console.warn(error);
        // return null
        return rejectWithValue("Error");
    }
})


const CategoriesSlice = createSlice({
    name : "categories",
    initialState : {
        categories: [],
        error: '',
        status: 'idle'
    },
    reducers : { 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllcategories.pending, (state, action) => {
                state.error = ''
                state.categories = []
                state.status = 'pending' 
            })
            .addCase(fetchAllcategories.rejected, (state, action) => {
                state.error = action.payload.data;
                state.status = 'rejected'
            })
            .addCase(fetchAllcategories.fulfilled, (state, action) => {
                state.categories = action.payload.data;
 
                state.status = 'fulfilled'
            })
            .addCase(deletecategorie.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                  (categories) => categories._id !== action.payload.data
                );
                state.status = 'fulfilled';
              })
    }
})

export default CategoriesSlice.reducer
export { deletecategorie}


// export const {Adduser} = UserSlice.actions
