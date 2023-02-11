import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTablesItems = createAsyncThunk(
  'users/fetchTablesItems',
  async () => {
    const { data } = await axios.get(
      'https://63e50cba4474903105f849b6.mockapi.io/items'
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: '',
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTablesItems.pending]: (state, action) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchTablesItems.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.items = action.payload;
    },
    [fetchTablesItems.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const {} = itemSlice.actions;

export default itemSlice.reducer;
