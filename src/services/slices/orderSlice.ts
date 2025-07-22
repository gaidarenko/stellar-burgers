import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi, getOrderByNumberApi } from '@api';

type TOrderState = {
  userOrders: Array<TOrder>;
  feeds: Array<TOrder>;
  orders: Array<TOrder>;
  isLoading: boolean;
  total: number;
  totalToday: number;
};

const initialState: TOrderState = {
  userOrders: [],
  feeds: [],
  orders: [],
  isLoading: false,
  total: 0,
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk('order/getAll', async () =>
  getFeedsApi()
);

export const fetchOrders = createAsyncThunk('order/getUserOrders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.userOrders,
    selectOrders: (state) => state.orders,
    selectFeeds: (state) => state.feeds,
    selectFeedIsLoading: (state) => state.isLoading,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const {
  selectOrders,
  selectUserOrders,
  selectFeeds,
  selectFeedIsLoading,
  selectFeedTotal,
  selectFeedTotalToday
} = orderSlice.selectors;
export const { reducer } = orderSlice;