import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchProduct} from '../products/productsSlice';
import axios from 'axios';

const initialState = { };

export const fetchMissingVariants = createAsyncThunk(
    'variants/fetchVariants', async (ids) => {
      let query = '';
      ids.forEach((item) => {
        query += `ids[]=${item}&`;
      });
      const res = await axios.get(
          process.env.REACT_APP_BASE_API_URL + `/api/variants?${query}`);
      return res.data;
    },
);

export const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchProduct.fulfilled]: (state, action) => {
      action.payload.variants.forEach((variant) => {
        state[variant.id] = variant;
      });
    },
    [fetchMissingVariants.fulfilled]: (state, action) => {
      action.payload.variants.forEach((item) => {
        state[item.id] = item;
      });
    },
  },
});

export default variantsSlice.reducer;

