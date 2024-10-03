import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface CounterState {
  highlight: boolean;
}

const initialState: CounterState = {
  highlight: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setHighlight(state, action: PayloadAction<boolean>) {
      state.highlight = action.payload;
    }
  },
});

export const selectHighlight = (state: RootState) => state.counter.highlight;

export default counterSlice.reducer;
