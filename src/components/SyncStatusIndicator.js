/**
 * Sync Status Indicator Component
 * 
 * Shows network connectivity and sync status
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useDataSync } from '../hooks/useDataSync';

const SyncStatusIndicator = ({ style }) => {
  const { isConnected } = useNetworkStatus();
  const { isSyncing, syncStatus } = useDataSync();

  const getStatusColor = () => {
    if (!isConnected) return '#FF3B30';
    if (isSyncing) return '#FF9500';
    if (syncStatus === 'synced') return '#34C759';
    if (syncStatus === 'error') return '#FF3B30';
    return '#8E8E93';
  };

  const getStatusText = () => {
    if (!isConnected) return 'Offline';
    if (isSyncing) return 'Syncing...';
    if (syncStatus === 'synced') return 'Synced';
    if (syncStatus === 'error') return 'Sync Error';
    if (syncStatus === 'pending') return 'Pending';
    return 'Unknown';
  };

  const getStatusIcon = () => {
    if (!isConnected) return 'wifi-off';
    if (isSyncing) return 'sync';
    if (syncStatus === 'synced') return 'wifi';
    if (syncStatus === 'error') return 'error';
    return 'wifi';
  };

  return (
    <View style={[styles.container, style]}>
      <Icon 
        name={getStatusIcon()} 
        size={16} 
        color={getStatusColor()} 
      />
      <Text style={[styles.statusText, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default SyncStatusIndicator;
