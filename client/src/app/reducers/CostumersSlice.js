import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const deleteCostumer = createAsyncThunk(
    'Costumer/deletePro',
    async (id, { rejectWithValue }) => {
      try {
        // Use your API endpoint to delete the Costumer
        await axios.delete(`http://localhost:3000/v1/Costumers/${id}`);
        
        return id;
      } catch (error) {
        console.warn(error);
        return rejectWithValue("Error");
      }
    }
  );
export const fetchAllCostumers = createAsyncThunk('Costumers/getAllCostumers', async (_, { rejectWithValue }) => {
    try {
        const Costumers = await axios.get('http://localhost:3000/v1/Costumers')
        return Costumers.data; 
    
    } catch (error) {
        console.warn(error);
        // return null
        return rejectWithValue("Error");
    }
})


const CostumersSlice = createSlice({
    name : "Costumers",
    initialState : {
        Costumers: [],
        error: '',
        status: 'idle'
    },
    reducers : { 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCostumers.pending, (state, action) => {
                state.error = ''
                state.Costumers = []
                state.status = 'pending' 
            })
            .addCase(fetchAllCostumers.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'rejected'
            })
            .addCase(fetchAllCostumers.fulfilled, (state, action) => {
                state.Costumers = action.payload.data;
 
                state.status = 'fulfilled'
            })
            .addCase(deleteCostumer.fulfilled, (state, action) => {
                state.Costumers = state.Costumers.filter(
                  (Costumer) => Costumer._id !== action.payload.data
                );
                state.status = 'fulfilled';
              })
    }
})

export default CostumersSlice.reducer
export { deleteCostumer }


// export const {Adduser} = UserSlice.actions
