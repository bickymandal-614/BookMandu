import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored
      ? JSON.parse(stored)
      : { items: [], totalItems: 0, subTotal: 0 };
  } catch (e) {
    console.log(e);
    return { items: [], totalItems: 0, subTotal: 0 };
  }
};

const calculateSubTotal = (items) =>
  items.reduce((acc, item) => acc + (item.newPrice || 0), 0);

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!existing) {
        state.items.push(action.payload);
        state.totalItems = state.items.length;
        state.subTotal = calculateSubTotal(state.items);
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.totalItems = state.items.length;
      state.subTotal = calculateSubTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subTotal = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
