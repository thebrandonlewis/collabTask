/**
 * Data Synchronization Hook
 * 
 * Custom hook for managing data synchronization
 */

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { syncService } from '../services/syncService';
import { fetchTaskLists } from '../store/slices/taskListsSlice';
import { fetchTasks } from '../store/slices/tasksSlice';
import { setSyncStatus } from '../store/slices/uiSlice';
import { useNetworkStatus } from './useNetworkStatus';

export const useDataSync = () => {
  const dispatch = useDispatch();
  const { isConnected } = useNetworkStatus();
  const { syncStatus } = useSelector((state) => state.ui);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [syncError, setSyncError] = useState(null);

  // Sync all data
  const syncAll = useCallback(async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setSyncError(null);
    dispatch(setSyncStatus('syncing'));

    try {
      const result = await syncService.syncAll();
      
      if (result.status === syncService.SYNC_STATUS.SYNCED) {
        // Update Redux store with fresh data
        dispatch(fetchTaskLists());
        
        setLastSync(new Date());
        dispatch(setSyncStatus('synced'));
        await syncService.updateLastSync();
      } else if (result.status === syncService.SYNC_STATUS.PENDING) {
        dispatch(setSyncStatus('pending'));
      } else {
        setSyncError(result.error);
        dispatch(setSyncStatus('error'));
      }
    } catch (error) {
      console.error('Sync error:', error);
      setSyncError(error);
      dispatch(setSyncStatus('error'));
    } finally {
      setIsSyncing(false);
    }
  }, [dispatch, isSyncing]);

  // Sync task lists only
  const syncTaskLists = useCallback(async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setSyncError(null);

    try {
      const result = await syncService.syncTaskLists();
      
      if (result.status === syncService.SYNC_STATUS.SYNCED) {
        dispatch(fetchTaskLists());
        setLastSync(new Date());
      } else {
        setSyncError(result.error);
      }
    } catch (error) {
      console.error('Task lists sync error:', error);
      setSyncError(error);
    } finally {
      setIsSyncing(false);
    }
  }, [dispatch, isSyncing]);

  // Sync tasks for a specific task list
  const syncTasks = useCallback(async (taskListId) => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setSyncError(null);

    try {
      const result = await syncService.syncTasks(taskListId);
      
      if (result.status === syncService.SYNC_STATUS.SYNCED) {
        dispatch(fetchTasks(taskListId));
        setLastSync(new Date());
      } else {
        setSyncError(result.error);
      }
    } catch (error) {
      console.error('Tasks sync error:', error);
      setSyncError(error);
    } finally {
      setIsSyncing(false);
    }
  }, [dispatch, isSyncing]);

  // Auto-sync when coming online
  useEffect(() => {
    if (isConnected && syncStatus === 'pending') {
      syncAll();
    }
  }, [isConnected, syncStatus, syncAll]);

  // Periodic sync (every 5 minutes when online)
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      if (syncStatus === 'synced' && !isSyncing) {
        syncAll();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isConnected, syncStatus, isSyncing, syncAll]);

  // Get cached data when offline
  const getCachedData = useCallback(async () => {
    try {
      const taskLists = await syncService.getCachedTaskLists();
      return { taskLists };
    } catch (error) {
      console.error('Error getting cached data:', error);
      return { taskLists: [] };
    }
  }, []);

  // Clear cache
  const clearCache = useCallback(async () => {
    try {
      await syncService.clearCache();
      setLastSync(null);
      dispatch(setSyncStatus('pending'));
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }, [dispatch]);

  return {
    isSyncing,
    lastSync,
    syncError,
    syncStatus,
    syncAll,
    syncTaskLists,
    syncTasks,
    getCachedData,
    clearCache,
  };
};
