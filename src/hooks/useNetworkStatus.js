/**
 * Network Status Hook
 * 
 * Custom hook for monitoring network connectivity
 */

import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { setNetworkStatus } from '../store/slices/uiSlice';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('unknown');
  const dispatch = useDispatch();

  useEffect(() => {
    // Get initial network state
    const getInitialNetworkState = async () => {
      const netInfo = await NetInfo.fetch();
      setIsConnected(netInfo.isConnected);
      setConnectionType(netInfo.type);
      dispatch(setNetworkStatus(netInfo.isConnected ? 'online' : 'offline'));
    };

    getInitialNetworkState();

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
      dispatch(setNetworkStatus(state.isConnected ? 'online' : 'offline'));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return {
    isConnected,
    connectionType,
    isOnline: isConnected,
    isOffline: !isConnected,
  };
};
