import { describe, test, expect } from '@jest/globals';
import {
  orderSlice,
  fetchFeeds,
  fetchOrders,
  getOrderByNumber,
  orderInitialState as initialState
} from './orderSlice';

describe('Проверяем ingredient reducer', () => {

  const mockOrders = [
    {
      _id: "687f8d864c8ab7001b25d415",
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093c"
      ],
      status: "done",
      name: "Краторный био-марсианский люминесцентный бургер",
      createdAt: "2025-07-22T13:09:26.712Z",
      updatedAt: "2025-07-22T13:09:27.452Z",
      number: 84953
    },
    {
      _id: "687f8b124c8ab7001b25d40d",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093d"
      ],
      status: "done",
      name: "Флюоресцентный люминесцентный метеоритный бургер",
      createdAt: "2025-07-22T12:58:58.308Z",
      updatedAt: "2025-07-22T12:58:59.242Z",
      number: 84952
    },
    {
      _id: "687f8a6a4c8ab7001b25d40c",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0949",
        "643d69a5c3f7b9001cfa0948"
      ],
      status: "done",
      name: "Флюоресцентный люминесцентный бессмертный альфа-сахаридный экзо-плантаго био-марсианский метеоритный бургер",
      createdAt: "2025-07-22T12:56:10.078Z",
      updatedAt: "2025-07-22T12:56:10.880Z",
      number: 84951
    }    
  ];

  const reducer = orderSlice.reducer;

  test('fetchFeeds.pending', () => {
    const action = fetchFeeds.pending('requestId'); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.feeds).toHaveLength(0);
    expect(newState.orders).toHaveLength(0);
    expect(newState.userOrders).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });

  test('fetchFeeds.rejected', () => {
    const action = fetchFeeds.rejected(null, 'requestId'); 
    const newState = reducer({...initialState, isLoading: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feeds).toHaveLength(0);
    expect(newState.orders).toHaveLength(0);
    expect(newState.userOrders).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });

  test('fetchFeeds.fulfilled', () => {
    const mockResponse = {
      success: true,
      orders: mockOrders,
      total: 84579,
      totalToday: 46
    };

    const action = fetchFeeds.fulfilled(mockResponse, 'requestId'); 
    const newState = reducer({...initialState, isLoading: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feeds).toHaveLength(3);
    expect(newState.feeds).toEqual(mockOrders);
    expect(newState.orders).toHaveLength(0);
    expect(newState.userOrders).toHaveLength(0);
    expect(newState.total).toBe(84579);
    expect(newState.totalToday).toBe(46);
  });

  test('fetchOrders.pending', () => {
    const action = fetchOrders.pending('requestId'); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.feeds).toHaveLength(0);
    expect(newState.orders).toHaveLength(0);
    expect(newState.userOrders).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });

  test('fetchOrders.rejected', () => {
    const action = fetchFeeds.rejected(null, 'requestId'); 
    const newState = reducer({...initialState, isLoading: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feeds).toHaveLength(0);
    expect(newState.orders).toHaveLength(0);
    expect(newState.userOrders).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });

  test('fetchOrders.fulfilled', () => {
    const action = fetchOrders.fulfilled(mockOrders, 'requestId'); 
    const newState = reducer({...initialState, isLoading: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feeds).toHaveLength(0);
    expect(newState.orders).toHaveLength(0);
    expect(newState.userOrders).toHaveLength(3);
    expect(newState.userOrders).toEqual(mockOrders);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });

  test('getOrderByNumber.pending', () => {
    const action = getOrderByNumber.pending('requestId', 0); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.feeds).toHaveLength(0);
    expect(newState.orders).toHaveLength(0);
    expect(newState.userOrders).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });

  test('getOrderByNumber.rejected', () => {
    const action = getOrderByNumber.rejected(null, 'requestId', 0); 
    const newState = reducer({...initialState, isLoading: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feeds).toHaveLength(0);
    expect(newState.orders).toHaveLength(0);
    expect(newState.userOrders).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });

  test('getOrderByNumber.fulfilled', () => {
    const mockResponse = {
      success: true,
      orders: mockOrders,
    };

    const action = getOrderByNumber.fulfilled(mockResponse, 'requestId', 0); 
    const newState = reducer({...initialState, isLoading: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feeds).toHaveLength(0);
    expect(newState.orders).toHaveLength(3);
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.userOrders).toHaveLength(0);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });
});