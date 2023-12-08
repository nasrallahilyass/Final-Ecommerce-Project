// import {
//   combineReducers,
//   configureStore,
//   createEntityAdapter,
// } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import { apiSlice } from "./slices/apiSlice";
// import {
//   FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,persistReducer,} from "redux-persist";

// // import storage from "redux-persist/lib/storage";


// // const tokenTransform = {
// //   in: (state) => {
// //     console.log("IN: ", state.sellerInfo?.token);
// //     return { sellerInfo: { token: state.sellerInfo?.token } };
// //   },
// //   out: (state, key) => {
// //     console.log("OUT: ", state.sellerInfo?.token);
// //     return { ...state, sellerInfo: { token: state.sellerInfo?.token } };
// //   },
// // };


// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(apiSlice.middleware),
//   devTools: true,
// });

// export default store;
