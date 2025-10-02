/**
 * Data Synchronization Service
 * 
 * Handles real-time data synchronization between app and backend
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskListService } from './taskListService';
import { taskService } from './taskService';
import NetInfo from '@react-native-community/netinfo';

export const syncService = {
  // Sync status constants
  SYNC_STATUS: {
    SYNCED: 'synced',
    SYNCING: 'syncing',
    PENDING: 'pending',
    ERROR: 'error',
  },

  // Check network connectivity
  async isOnline() {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected;
  },

  // Sync task lists with backend
  async syncTaskLists() {
    try {
      const isOnline = await this.isOnline();
      if (!isOnline) {
        return { status: this.SYNC_STATUS.PENDING, data: null };
      }

      const taskLists = await taskListService.getTaskLists();
      
      // Store in local storage for offline access
      await AsyncStorage.setItem('taskLists', JSON.stringify(taskLists));
      
      return { status: this.SYNC_STATUS.SYNCED, data: taskLists };
    } catch (error) {
      console.error('Error syncing task lists:', error);
      return { status: this.SYNC_STATUS.ERROR, data: null, error };
    }
  },

  // Sync tasks for a specific task list
  async syncTasks(taskListId) {
    try {
      const isOnline = await this.isOnline();
      if (!isOnline) {
        return { status: this.SYNC_STATUS.PENDING, data: null };
      }

      const tasks = await taskService.getTasks(taskListId);
      
      // Store in local storage for offline access
      await AsyncStorage.setItem(`tasks_${taskListId}`, JSON.stringify(tasks));
      
      return { status: this.SYNC_STATUS.SYNCED, data: tasks };
    } catch (error) {
      console.error('Error syncing tasks:', error);
      return { status: this.SYNC_STATUS.ERROR, data: null, error };
    }
  },

  // Get cached task lists
  async getCachedTaskLists() {
    try {
      const cachedData = await AsyncStorage.getItem('taskLists');
      return cachedData ? JSON.parse(cachedData) : [];
    } catch (error) {
      console.error('Error getting cached task lists:', error);
      return [];
    }
  },

  // Get cached tasks for a task list
  async getCachedTasks(taskListId) {
    try {
      const cachedData = await AsyncStorage.getItem(`tasks_${taskListId}`);
      return cachedData ? JSON.parse(cachedData) : [];
    } catch (error) {
      console.error('Error getting cached tasks:', error);
      return [];
    }
  },

  // Sync all data
  async syncAll() {
    try {
      const isOnline = await this.isOnline();
      if (!isOnline) {
        return { status: this.SYNC_STATUS.PENDING, message: 'Offline - using cached data' };
      }

      // Sync task lists
      const taskListsResult = await this.syncTaskLists();
      if (taskListsResult.status === this.SYNC_STATUS.ERROR) {
        return taskListsResult;
      }

      // Sync tasks for each task list
      const taskLists = taskListsResult.data || [];
      for (const taskList of taskLists) {
        await this.syncTasks(taskList.id);
      }

      return { status: this.SYNC_STATUS.SYNCED, message: 'All data synced successfully' };
    } catch (error) {
      console.error('Error syncing all data:', error);
      return { status: this.SYNC_STATUS.ERROR, error };
    }
  },

  // Clear all cached data
  async clearCache() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const syncKeys = keys.filter(key => 
        key.startsWith('taskLists') || key.startsWith('tasks_')
      );
      await AsyncStorage.multiRemove(syncKeys);
      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return false;
    }
  },

  // Get sync status
  async getSyncStatus() {
    try {
      const isOnline = await this.isOnline();
      const lastSync = await AsyncStorage.getItem('lastSync');
      
      return {
        isOnline,
        lastSync: lastSync ? new Date(lastSync) : null,
        status: isOnline ? this.SYNC_STATUS.SYNCED : this.SYNC_STATUS.PENDING,
      };
    } catch (error) {
      console.error('Error getting sync status:', error);
      return {
        isOnline: false,
        lastSync: null,
        status: this.SYNC_STATUS.ERROR,
      };
    }
  },

  // Update last sync timestamp
  async updateLastSync() {
    try {
      await AsyncStorage.setItem('lastSync', new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Error updating last sync:', error);
      return false;
    }
  },
};
