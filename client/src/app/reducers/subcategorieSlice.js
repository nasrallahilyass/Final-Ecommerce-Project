import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deletesubcategorie = createAsyncThunk(
    'Subcategorie/deleteSubcategorie',
    async (id, { rejectWithValue }) => {
      try {
        // Use your API endpoint to delete the product
        await axios.delete(`http://localhost:3000/v1/subcategories/${id}`);
        
        return id;
      } catch (error) {
        console.warn(error);
        return rejectWithValue("Error");
      }
    }
  );
export const fetchAllSubcategories = createAsyncThunk('subcategories/getAllSubcategories', async (_, { rejectWithValue }) => {
    try {
        const subcategories = await axios.get('http://localhost:3000/v1/subcategorie')
        return subcategories.data; 
    
    } catch (error) {
        console.warn(error);
        // return null
        return rejectWithValue("Error");
    }
})


const subCategoriesSlice = createSlice({
    name : "subcategories",
    initialState : {
        subcategories: [],
        error: '',
        status: 'idle'
    },
    reducers : { 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSubcategories.pending, (state, action) => {
                state.error = ''
                state.subcategories = []
                state.status = 'pending' 
            })
            .addCase(fetchAllSubcategories.rejected, (state, action) => {
                state.error = action.payload.data;
                state.status = 'rejected'
            })
            .addCase(fetchAllSubcategories.fulfilled, (state, action) => {
                state.subcategories = action.payload.data;
 
                state.status = 'fulfilled'
            })
            .addCase(deletesubcategorie.fulfilled, (state, action) => {
                state.subcategories = state.subcategories.filter(
                  (subcategories) => subcategories._id !== action.payload.data
                );
                state.status = 'fulfilled';
              })
    }
})

export default subCategoriesSlice.reducer
export { deletesubcategorie}


// export const {Adduser} = UserSlice.actions
