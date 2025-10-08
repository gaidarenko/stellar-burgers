import { describe, test, expect } from '@jest/globals';
import {
  userSlice,
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userInitialState as initialState
} from './userSlice';

describe('Проверяем user reducer', () => {
  const user = {
    email: 'email',
    name: 'name'
  };

  const login = {
    email: 'email',
    password: 'password'
  };

  const register = {
    name: 'name',
    email: 'email',
    password: 'password'
  }

  const reducer = userSlice.reducer;

  test('fetchUser.pending', () => {
    const action = fetchUser.pending('requestId'); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('fetchUser.rejected', () => {
    const action = fetchUser.rejected(null, 'requestId'); 
    const newState = reducer({...initialState, user}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('fetchUser.fulfilled', () => {
    const mockResponse = {
      success: true,
      user
    };

    const action = fetchUser.fulfilled(mockResponse, 'requestId'); 
    const newState = reducer({...initialState, isLoading: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toEqual(user);
  });

  test('logoutUser.pending', () => {
    const action = logoutUser.pending('requestId'); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(true);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('logoutUser.rejected', () => {
    const action = logoutUser.rejected(null, 'requestId'); 
    const newState = reducer({...initialState, isLogging: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('logoutUser.fulfilled', () => {
    const action = logoutUser.fulfilled({success: true}, 'requestId'); 
    const newState = reducer({...initialState, isLogging: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('loginUser.pending', () => {
    const action = loginUser.pending('requestId', login); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(true);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('loginUser.rejected', () => {
    const action = loginUser.rejected(null, 'requestId', login); 
    const newState = reducer({...initialState, isLogging: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('loginUser.fulfilled', () => {
    const action = loginUser.fulfilled(user, 'requestId', login); 
    const newState = reducer({...initialState, isLogging: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toEqual(user);
  });

  test('registerUser.pending', () => {
    const action = registerUser.pending('requestId', register); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(true);
    expect(newState.user).toBeNull();
  });

  test('registerUser.rejected', () => {
    const action = registerUser.rejected(null, 'requestId', register); 
    const newState = reducer({...initialState, isRegistering: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('registerUser.fulfilled', () => {
    const action = registerUser.fulfilled(user, 'requestId', register); 
    const newState = reducer({...initialState, isRegistering: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toEqual(user);
  });

  test('updateUser.pending', () => {
    const action = updateUser.pending('requestId', register); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(true);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('updateUser.rejected', () => {
    const action = updateUser.rejected(null, 'requestId', register); 
    const newState = reducer({...initialState, isUpdating: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('updateUser.fulfilled', () => {
    const action = updateUser.fulfilled(user, 'requestId', register); 
    const newState = reducer({...initialState, isUpdating: true}, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isLogging).toBe(false);
    expect(newState.isUpdating).toBe(false);
    expect(newState.isRegistering).toBe(false);
    expect(newState.user).toEqual(user);
  });
});