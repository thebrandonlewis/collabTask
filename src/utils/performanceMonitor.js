import { Platform } from 'react-native';

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      renderTimes: [],
      apiResponseTimes: [],
      memoryUsage: [],
      networkRequests: [],
    };
    this.isMonitoring = false;
  }

  startMonitoring() {
    this.isMonitoring = true;
    this.startTime = Date.now();
    console.log('🔍 Performance monitoring started');
  }

  stopMonitoring() {
    this.isMonitoring = false;
    const totalTime = Date.now() - this.startTime;
    console.log('⏹️ Performance monitoring stopped');
    console.log(`📊 Total monitoring time: ${totalTime}ms`);
    this.generateReport();
  }

  recordRenderTime(componentName, renderTime) {
    if (!this.isMonitoring) return;

    this.metrics.renderTimes.push({
      component: componentName,
      time: renderTime,
      timestamp: Date.now(),
    });

    if (renderTime > 16) { // 60fps threshold
      console.warn(`⚠️ Slow render detected: ${componentName} took ${renderTime}ms`);
    }
  }

  recordApiResponseTime(endpoint, responseTime, status) {
    if (!this.isMonitoring) return;

    this.metrics.apiResponseTimes.push({
      endpoint,
      time: responseTime,
      status,
      timestamp: Date.now(),
    });

    if (responseTime > 2000) { // 2 second threshold
      console.warn(`⚠️ Slow API response: ${endpoint} took ${responseTime}ms`);
    }
  }

  recordMemoryUsage() {
    if (!this.isMonitoring || Platform.OS !== 'ios') return;

    // iOS memory monitoring
    if (global.performance && global.performance.memory) {
      const memory = global.performance.memory;
      this.metrics.memoryUsage.push({
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        timestamp: Date.now(),
      });

      const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      if (usagePercent > 80) {
        console.warn(`⚠️ High memory usage: ${usagePercent.toFixed(2)}%`);
      }
    }
  }

  recordNetworkRequest(url, method, duration, status) {
    if (!this.isMonitoring) return;

    this.metrics.networkRequests.push({
      url,
      method,
      duration,
      status,
      timestamp: Date.now(),
    });
  }

  getAverageRenderTime() {
    if (this.metrics.renderTimes.length === 0) return 0;
    const total = this.metrics.renderTimes.reduce((sum, metric) => sum + metric.time, 0);
    return total / this.metrics.renderTimes.length;
  }

  getAverageApiResponseTime() {
    if (this.metrics.apiResponseTimes.length === 0) return 0;
    const total = this.metrics.apiResponseTimes.reduce((sum, metric) => sum + metric.time, 0);
    return total / this.metrics.apiResponseTimes.length;
  }

  getSlowestComponents(limit = 5) {
    return this.metrics.renderTimes
      .sort((a, b) => b.time - a.time)
      .slice(0, limit);
  }

  getSlowestApiEndpoints(limit = 5) {
    return this.metrics.apiResponseTimes
      .sort((a, b) => b.time - a.time)
      .slice(0, limit);
  }

  getNetworkErrorRate() {
    if (this.metrics.networkRequests.length === 0) return 0;
    const errors = this.metrics.networkRequests.filter(req => req.status >= 400);
    return (errors.length / this.metrics.networkRequests.length) * 100;
  }

  generateReport() {
    const report = {
      summary: {
        totalRenderTime: this.metrics.renderTimes.length,
        totalApiCalls: this.metrics.apiResponseTimes.length,
        totalNetworkRequests: this.metrics.networkRequests.length,
        averageRenderTime: this.getAverageRenderTime(),
        averageApiResponseTime: this.getAverageApiResponseTime(),
        networkErrorRate: this.getNetworkErrorRate(),
      },
      slowestComponents: this.getSlowestComponents(),
      slowestApiEndpoints: this.getSlowestApiEndpoints(),
      memoryUsage: this.metrics.memoryUsage,
    };

    console.log('📊 Performance Report:', JSON.stringify(report, null, 2));
    return report;
  }

  reset() {
    this.metrics = {
      renderTimes: [],
      apiResponseTimes: [],
      memoryUsage: [],
      networkRequests: [],
    };
  }
}

export default new PerformanceMonitor();
