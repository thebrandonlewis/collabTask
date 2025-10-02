import { useCallback, useMemo, useRef, useEffect } from 'react';
import { InteractionManager } from 'react-native';
import performanceMonitor from '../utils/performanceMonitor';

export const usePerformanceOptimization = () => {
  const renderStartTime = useRef(null);
  const componentName = useRef('Unknown');

  // Track render performance
  const startRenderTracking = useCallback((name) => {
    componentName.current = name;
    renderStartTime.current = Date.now();
  }, []);

  const endRenderTracking = useCallback(() => {
    if (renderStartTime.current) {
      const renderTime = Date.now() - renderStartTime.current;
      performanceMonitor.recordRenderTime(componentName.current, renderTime);
      renderStartTime.current = null;
    }
  }, []);

  // Debounced function to prevent excessive calls
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Throttled function to limit call frequency
  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Memoized expensive calculations
  const memoizeExpensiveCalculation = useCallback((calculation, dependencies) => {
    return useMemo(() => {
      const startTime = Date.now();
      const result = calculation();
      const endTime = Date.now();
      
      if (endTime - startTime > 10) { // Log slow calculations
        console.warn(`⚠️ Slow calculation detected: ${endTime - startTime}ms`);
      }
      
      return result;
    }, dependencies);
  }, []);

  // Lazy loading for heavy components
  const lazyLoadComponent = useCallback((importFunction) => {
    return useMemo(() => {
      return React.lazy(importFunction);
    }, []);
  }, []);

  // Optimize list rendering
  const optimizeListRendering = useCallback((items, keyExtractor, renderItem) => {
    return useMemo(() => {
      return {
        data: items,
        keyExtractor,
        renderItem,
        getItemLayout: (data, index) => ({
          length: 60, // Estimated item height
          offset: 60 * index,
          index,
        }),
        removeClippedSubviews: true,
        maxToRenderPerBatch: 10,
        windowSize: 10,
        initialNumToRender: 10,
        updateCellsBatchingPeriod: 50,
      };
    }, [items, keyExtractor, renderItem]);
  }, []);

  // Memory optimization
  const optimizeMemoryUsage = useCallback(() => {
    useEffect(() => {
      const interval = setInterval(() => {
        performanceMonitor.recordMemoryUsage();
      }, 5000); // Check memory every 5 seconds

      return () => clearInterval(interval);
    }, []);
  }, []);

  // Network optimization
  const optimizeNetworkRequests = useCallback((apiCall, endpoint) => {
    return useCallback(async (...args) => {
      const startTime = Date.now();
      try {
        const result = await apiCall(...args);
        const endTime = Date.now();
        performanceMonitor.recordApiResponseTime(endpoint, endTime - startTime, 200);
        return result;
      } catch (error) {
        const endTime = Date.now();
        performanceMonitor.recordApiResponseTime(endpoint, endTime - startTime, error.response?.status || 500);
        throw error;
      }
    }, [apiCall, endpoint]);
  }, []);

  // Interaction optimization
  const runAfterInteractions = useCallback((callback) => {
    InteractionManager.runAfterInteractions(() => {
      callback();
    });
  }, []);

  // Image optimization
  const optimizeImageLoading = useCallback((imageUri, options = {}) => {
    return {
      uri: imageUri,
      cache: 'force-cache',
      priority: 'normal',
      ...options,
    };
  }, []);

  // Bundle size optimization
  const optimizeImports = useCallback((imports) => {
    return useMemo(() => {
      // Only import what's needed
      return Object.keys(imports).reduce((acc, key) => {
        if (imports[key]) {
          acc[key] = imports[key];
        }
        return acc;
      }, {});
    }, [imports]);
  }, []);

  return {
    startRenderTracking,
    endRenderTracking,
    debounce,
    throttle,
    memoizeExpensiveCalculation,
    lazyLoadComponent,
    optimizeListRendering,
    optimizeMemoryUsage,
    optimizeNetworkRequests,
    runAfterInteractions,
    optimizeImageLoading,
    optimizeImports,
  };
};
