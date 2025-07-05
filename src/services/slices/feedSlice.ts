import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';

type TFeedsState = {
  userOrders: Array<TOrder>;
  orders: Array<TOrder>;
  isLoading: boolean;
  total: number;
  totalToday: number;
};

const initialState: TFeedsState = {
  userOrders: [],
  orders: [],
  isLoading: false,
  total: 0,
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

export const fetchOrders = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.userOrders,
    selectFeeds: (state) => state.orders,
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
        state.orders = action.payload.orders;
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
      });
  }
});

export const {
  selectUserOrders,
  selectFeeds,
  selectFeedIsLoading,
  selectFeedTotal,
  selectFeedTotalToday
} = feedSlice.selectors;
