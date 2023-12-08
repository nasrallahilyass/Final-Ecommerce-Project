import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from "./reducers/ProductsSlice"

export default configureStore({
  reducer: {
    productsList : ProductsReducer
  },
})