/**
 * Pull to Refresh Component
 * 
 * Custom pull-to-refresh component for manual data synchronization
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, PanGestureHandler, State } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDataSync } from '../hooks/useDataSync';

const PullToRefresh = ({ children, onRefresh, refreshing = false }) => {
  const [translateY] = useState(new Animated.Value(0));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { syncAll } = useDataSync();

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        await syncAll();
      }
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY, velocityY } = event.nativeEvent;
      
      if (translationY > 100 || velocityY > 500) {
        handleRefresh();
      }
      
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const refreshIndicatorOpacity = translateY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const refreshIndicatorTranslateY = translateY.interpolate({
    inputRange: [0, 100],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.refreshIndicator,
          {
            opacity: refreshIndicatorOpacity,
            transform: [{ translateY: refreshIndicatorTranslateY }],
          },
        ]}
      >
        <Icon 
          name={isRefreshing ? "sync" : "refresh"} 
          size={20} 
          color="#007AFF" 
        />
        <Text style={styles.refreshText}>
          {isRefreshing ? 'Syncing...' : 'Pull to refresh'}
        </Text>
      </Animated.View>
      
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        enabled={!isRefreshing}
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  refreshText: {
    color: '#007AFF',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default PullToRefresh;
