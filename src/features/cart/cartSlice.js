import {createSlice} from '@reduxjs/toolkit';

const initialState = {
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      console.log(cart);
      if (cart) {
      //  console.log(cart, 'loadCart');
        Object.assign(state, cart);
      }
    },
    addItem: (state, action) => {
      let quantity = state[action.payload.productId];
      quantity = quantity ? quantity : 0;
      quantity += action.payload.quantity;
      //  console.log(quantity, 'addItem');
      state[action.payload.productId] = quantity;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      delete state[`${action.payload}`];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      state[`${action.payload.id}`] = action.payload.quantity;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state, action) => {
      Object.keys(state).forEach((item) => {
        delete state[item];
      });
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const {
  addItem,
  removeItem,
  loadCart,
  getProducts,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
