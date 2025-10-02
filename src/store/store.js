/**
 * Redux Store Configuration
 * 
 * Centralized state management for CollabTask app
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskListsReducer from './slices/taskListsSlice';
import tasksReducer from './slices/tasksSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    taskLists: taskListsReducer,
    tasks: tasksReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
