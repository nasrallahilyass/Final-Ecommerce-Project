import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import http from "../utils/http";

// Async thunk for making an HTTP request
export const fetchUserData = createAsyncThunk("auth/fetchUserData", async (userId, thunkAPI) => {
  try {
    const response = await http.get(`/users/${userId}`,);
    return response.data;
  } catch (error) {
    // Handle errors
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
// const authAdapter = createEntityAdapter()

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwt: null,
    status: "idle",
    error: null,
    sellerInfo: null, // Add this line if you need to initialize sellerInfo

  },
  // initialState: authAdapter.getInitialState(),
  reducers: {
    // Other synchronous actions can go here
    setCredentials: (state, action) => {
      state.jwt = action.payload?.token;
      state.sellerInfo = action.payload.data[0];
    },
    setSellerInfo: (state, action) => {
      state.sellerInfo = action.payload;
    },
    logout: (state) => {
      state.jwt = null;
      state.sellerInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sellerInfo = action.payload.data[0];
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

  },
});

const persistedReducer = persistReducer(
  {
    key: "auth",
    storage: storage,
    // blacklist: [apiSlice.reducerPath],
    whitelist: ["jwt", "sellerInfo"],
    // transforms: [tokenTransform],
  },
  authSlice.reducer
);


export const { setCredentials, setSellerInfo, logout } = authSlice.actions;

export default persistedReducer;
