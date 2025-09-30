/**
 * Offline Indicator Component
 * 
 * Shows when the app is offline and using cached data
 */

import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const OfflineIndicator = () => {
  const { isConnected } = useNetworkStatus();

  if (isConnected) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Icon name="wifi-off" size={16} color="#FF3B30" />
      <Text style={styles.text}>You're offline - using cached data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default OfflineIndicator;
