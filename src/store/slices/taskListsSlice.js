/**
 * Task Lists Slice
 * 
 * Manages task lists state and actions
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskListService } from '../../services/taskListService';

// Async thunks for task lists
export const fetchTaskLists = createAsyncThunk(
  'taskLists/fetchTaskLists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskListService.getTaskLists();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch task lists');
    }
  }
);

export const createTaskList = createAsyncThunk(
  'taskLists/createTaskList',
  async ({ title, description, isPublic }, { rejectWithValue }) => {
    try {
      const response = await taskListService.createTaskList(title, description, isPublic);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create task list');
    }
  }
);

export const updateTaskList = createAsyncThunk(
  'taskLists/updateTaskList',
  async ({ id, title, description, isPublic }, { rejectWithValue }) => {
    try {
      const response = await taskListService.updateTaskList(id, title, description, isPublic);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update task list');
    }
  }
);

export const deleteTaskList = createAsyncThunk(
  'taskLists/deleteTaskList',
  async (id, { rejectWithValue }) => {
    try {
      await taskListService.deleteTaskList(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete task list');
    }
  }
);

const initialState = {
  taskLists: [],
  currentTaskList: null,
  isLoading: false,
  error: null,
};

const taskListsSlice = createSlice({
  name: 'taskLists',
  initialState,
  reducers: {
    setCurrentTaskList: (state, action) => {
      state.currentTaskList = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch task lists
      .addCase(fetchTaskLists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTaskLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskLists = action.payload;
        state.error = null;
      })
      .addCase(fetchTaskLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create task list
      .addCase(createTaskList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTaskList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskLists.push(action.payload);
        state.error = null;
      })
      .addCase(createTaskList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update task list
      .addCase(updateTaskList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTaskList.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.taskLists.findIndex(list => list.id === action.payload.id);
        if (index !== -1) {
          state.taskLists[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTaskList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete task list
      .addCase(deleteTaskList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTaskList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskLists = state.taskLists.filter(list => list.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTaskList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentTaskList, clearError } = taskListsSlice.actions;
export default taskListsSlice.reducer;
