import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const ORDERS_URL = 'http://localhost:8000/api/order';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : null,
  itemsPrice: localStorage.getItem('itemsPrice')
    ? localStorage.getItem('itemsPrice')
    : 0,
  shippingPrice: 100,
  totalPrice: localStorage.getItem('totalPrice')
    ? parseFloat(localStorage.getItem('totalPrice')).toFixed(2)
    : 0,
  paymentMethod: localStorage.getItem('paymentMethod')
    ? localStorage.getItem('paymentMethod')
    : 'PayPal',
  order: localStorage.getItem('order')
    ? JSON.parse(localStorage.getItem('order'))
    : null,
  orders: localStorage.getItem('orders')
    ? JSON.parse(localStorage.getItem('orders'))
    : null,
  successPay: false,
  loadingPay: false,
};
export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async (order) => {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const response = await axios.post(`${ORDERS_URL}/`, order, {
        headers: { authorization: `Bearer ${token}` },
      });
      return { ...response.data };
    } catch (err) {
      return err.message;
    }
  }
);
export const fetchOrder = createAsyncThunk(
  'cart/fetchOrder',
  async (orderId) => {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const response = await axios.get(`${ORDERS_URL}/${orderId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return { ...response.data };
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'cart/fetchUserOrders',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const response = await axios.get(`${ORDERS_URL}/fetchUserOrders`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return { ...response.data };
    } catch (err) {
      return err.message;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action) {
      const existItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existItem !== undefined) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === existItem._id ? action.payload : item
        );
      } else {
        state.cartItems = state.cartItems.concat({
          ...action.payload,
          quantity: 1,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItem(state, action) {
      const cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = cartItems;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      );
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', state.paymentMethod);
    },
    payRequest(state) {
      state.loadingPay = true;
      state.successPay = false;
    },
    paySuccess(state, action) {
      state.loadingPay = false;
      state.successPay = true;
      state.order = action.payload;
    },
    payFail(state) {
      state.loadingPay = false;
      state.successPay = false;
    },
    payReset(state) {
      state.loadingPay = false;
      state.successPay = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.statusCode = '201';
        state.order = action.payload;
        localStorage.setItem('order', JSON.stringify(action.payload));
      })
      .addCase(createOrder.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.statusCode = '201';
        state.order = action.payload;
        localStorage.setItem('order', JSON.stringify(action.payload));
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.statusCode = '201';
        state.orders = action.payload;
        localStorage.setItem('orders', JSON.stringify(action.payload));
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.status = 'failed';
        console.log('failed');
      });
  },
});
export const {
  addCartItem,
  removeCartItem,
  saveShippingAddress,
  savePaymentMethod,
  payRequest,
  paySuccess,
  payFail,
  payReset,
} = cartSlice.actions;
export const clearCart = (state) => (state.cart = {});
export const selectAllCartItems = (state) => state.cart.cartItems;
export const selectAllItems = (state) => state.cart;
export const selectItemById = (state, id) =>
  state.cart.cartItems.find((product) => product._id === id);

export const selectPaymentMethod = (state) => state.cart.paymentMethod;
export const selectStatusCode = (state) => state.cart.statusCode;
export const selectOrder = (state) => state.cart.order;
export const selectOrders = (state) => state.cart.orders;
export const selectSuccessPay = (state) => state.cart.successPay;
export const selectLoadingPay = (state) => state.cart.loadingPay;

export default cartSlice.reducer;
