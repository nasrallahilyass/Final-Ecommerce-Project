// import { configureStore } from '@reduxjs/toolkit'
 import ProductsReducer from "./reducers/ProductsSlice"
 import subCategoriesReducer from"./reducers/subcategorieSlice"
 import CategoriesReducer from"./reducers/CategorieSlice"
// import persistedReducer from '../slices/authSlice'

// export default configureStore({
//   reducer: {
//     productsList : ProductsReducer,
//     auth: persistedReducer
//   },
// })
// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../redux/card';
import { combineReducers,createEntityAdapter} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { apiSlice } from "../slices/apiSlice";
import {
  FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,persistReducer,} from "redux-persist";


const store = configureStore({
  reducer: {
    subCategoriesList : subCategoriesReducer,
    CategoriesList: CategoriesReducer,
    productsList : ProductsReducer,
    cards: cardsReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;