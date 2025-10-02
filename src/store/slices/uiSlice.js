/**
 * UI Slice
 * 
 * Manages UI state and actions
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark',
  isLoading: false,
  error: null,
  networkStatus: 'online',
  syncStatus: 'synced',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setNetworkStatus: (state, action) => {
      state.networkStatus = action.payload;
    },
    setSyncStatus: (state, action) => {
      state.syncStatus = action.payload;
    },
  },
});

export const {
  setTheme,
  setLoading,
  setError,
  clearError,
  setNetworkStatus,
  setSyncStatus,
} = uiSlice.actions;

export default uiSlice.reducer;
