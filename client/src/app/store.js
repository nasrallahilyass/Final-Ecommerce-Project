import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from "./reducers/ProductsSlice"
import persistedReducer from '../slices/authSlice'

export default configureStore({
  reducer: {
    productsList : ProductsReducer,
    auth: persistedReducer
  },
})