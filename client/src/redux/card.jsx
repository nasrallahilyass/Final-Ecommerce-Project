// src/store/cards.js

import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    leftCard: {
      title: 'Default Left Card Title',
      description: 'Default description for the left card.',
      imageSrc: 'URL_TO_DEFAULT_LEFT_IMAGE',
    },
    rightCard: {
      title: 'Default Right Card Title',
      description: 'Default description for the right card.',
      imageSrc: 'URL_TO_DEFAULT_RIGHT_IMAGE',
    },
  },
  reducers: {
    updateLeftCard: (state, action) => {
      state.leftCard = action.payload;
    },
    updateRightCard: (state, action) => {
      state.rightCard = action.payload;
    },
  },
});

export const { updateLeftCard, updateRightCard } = cardsSlice.actions;

export default cardsSlice.reducer;
