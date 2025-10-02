import { Platform } from 'react-native';

// Image optimization utilities
export const optimizeImage = (uri, options = {}) => {
  const optimizedOptions = {
    cache: 'force-cache',
    priority: 'normal',
    ...options,
  };

  // Add platform-specific optimizations
  if (Platform.OS === 'ios') {
    optimizedOptions.resizeMode = 'cover';
  }

  return {
    uri,
    ...optimizedOptions,
  };
};

// Bundle size optimization
export const lazyImport = (importFunction) => {
  return React.lazy(importFunction);
};

// Memory optimization
export const clearMemoryCache = () => {
  if (global.gc) {
    global.gc();
  }
};

// Network optimization
export const optimizeApiCall = (apiFunction, endpoint) => {
  return async (...args) => {
    const startTime = Date.now();
    try {
      const result = await apiFunction(...args);
      const endTime = Date.now();
      
      // Log slow API calls
      if (endTime - startTime > 1000) {
        console.warn(`⚠️ Slow API call: ${endpoint} took ${endTime - startTime}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = Date.now();
      console.error(`❌ API error: ${endpoint} failed after ${endTime - startTime}ms`, error);
      throw error;
    }
  };
};

// List rendering optimization
export const getOptimizedListProps = (items) => {
  return {
    data: items,
    removeClippedSubviews: true,
    maxToRenderPerBatch: 10,
    windowSize: 10,
    initialNumToRender: 10,
    updateCellsBatchingPeriod: 50,
    getItemLayout: (data, index) => ({
      length: 60, // Estimated item height
      offset: 60 * index,
      index,
    }),
  };
};

// Animation optimization
export const useNativeDriver = true;

// Text optimization
export const optimizeTextRendering = (text, maxLength = 100) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

// Storage optimization
export const optimizeStorage = {
  // Batch storage operations
  batchSetItem: async (items) => {
    const promises = Object.entries(items).map(([key, value]) => 
      AsyncStorage.setItem(key, JSON.stringify(value))
    );
    await Promise.all(promises);
  },

  // Batch get operations
  batchGetItem: async (keys) => {
    const promises = keys.map(key => AsyncStorage.getItem(key));
    const results = await Promise.all(promises);
    return keys.reduce((acc, key, index) => {
      acc[key] = results[index] ? JSON.parse(results[index]) : null;
      return acc;
    }, {});
  },

  // Clear old data
  clearOldData: async (maxAge = 7 * 24 * 60 * 60 * 1000) => { // 7 days
    const keys = await AsyncStorage.getAllKeys();
    const now = Date.now();
    
    for (const key of keys) {
      try {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          if (parsed.timestamp && now - parsed.timestamp > maxAge) {
            await AsyncStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn(`Failed to process key ${key}:`, error);
      }
    }
  },
};

// Network optimization
export const optimizeNetwork = {
  // Request deduplication
  requestCache: new Map(),
  
  deduplicateRequest: (key, requestFunction) => {
    if (optimizeNetwork.requestCache.has(key)) {
      return optimizeNetwork.requestCache.get(key);
    }
    
    const promise = requestFunction().finally(() => {
      optimizeNetwork.requestCache.delete(key);
    });
    
    optimizeNetwork.requestCache.set(key, promise);
    return promise;
  },

  // Request batching
  batchRequests: (requests, batchSize = 5) => {
    const batches = [];
    for (let i = 0; i < requests.length; i += batchSize) {
      batches.push(requests.slice(i, i + batchSize));
    }
    return batches;
  },
};

// Component optimization
export const optimizeComponent = {
  // Memoization helper
  memoize: (fn, keyFn) => {
    const cache = new Map();
    return (...args) => {
      const key = keyFn ? keyFn(...args) : JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  },

  // Debounce helper
  debounce: (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(null, args), delay);
    };
  },

  // Throttle helper
  throttle: (fn, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
};

// Performance monitoring
export const performanceUtils = {
  // Measure function execution time
  measureTime: (fn, label) => {
    const start = Date.now();
    const result = fn();
    const end = Date.now();
    console.log(`⏱️ ${label}: ${end - start}ms`);
    return result;
  },

  // Measure async function execution time
  measureAsyncTime: async (fn, label) => {
    const start = Date.now();
    const result = await fn();
    const end = Date.now();
    console.log(`⏱️ ${label}: ${end - start}ms`);
    return result;
  },

  // Memory usage monitoring
  getMemoryUsage: () => {
    if (Platform.OS === 'ios' && global.performance && global.performance.memory) {
      const memory = global.performance.memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      };
    }
    return null;
  },
};

// Platform-specific optimizations
export const platformOptimizations = {
  ios: {
    // iOS-specific optimizations
    useNativeDriver: true,
    shouldRasterizeIOS: true,
    renderToHardwareTextureAndroid: false,
  },
  android: {
    // Android-specific optimizations
    useNativeDriver: true,
    shouldRasterizeIOS: false,
    renderToHardwareTextureAndroid: true,
  },
};

export const getPlatformOptimizations = () => {
  return platformOptimizations[Platform.OS] || platformOptimizations.ios;
};
