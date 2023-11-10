// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../redux/card';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export default store;
