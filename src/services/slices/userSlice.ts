import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  logoutApi,
  getUserApi,
  updateUserApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  isLogging: boolean;
  isUpdating: boolean;
  isRegistering: boolean;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  isLogging: false,
  isUpdating: false,
  isRegistering: false
};

export const fetchUser = createAsyncThunk('user/get', async () => getUserApi());

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(loginData);

      if (!res?.success) {
        return rejectWithValue(res);
      }

      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutApi();

      if (!res?.success) {
        return rejectWithValue(res);
      }

      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(registerData);

      if (!res?.success) {
        return rejectWithValue(res);
      }
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (registerData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(registerData);

      if (!res?.success) {
        return rejectWithValue(res);
      }

      return res.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectUserIsLoading: (state) => state.isLoading,
    selectUserIsLogging: (state) => state.isLogging,
    selectUserIsUpdating: (state) => state.isUpdating,
    selectUserIsRegistering: (state) => state.isRegistering
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLogging = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLogging = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogging = false;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isRegistering = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isRegistering = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLogging = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLogging = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLogging = false;
        state.user = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload;
      });
  }
});

export const {
  selectUser,
  selectUserIsLoading,
  selectUserIsLogging,
  selectUserIsUpdating,
  selectUserIsRegistering
} = userSlice.selectors;
export const { reducer } = userSlice;