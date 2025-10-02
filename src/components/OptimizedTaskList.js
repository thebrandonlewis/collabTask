import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';

const TaskItem = memo(({ task, onPress, onToggleStatus, onDelete }) => {
  const { startRenderTracking, endRenderTracking } = usePerformanceOptimization();

  React.useEffect(() => {
    startRenderTracking('TaskItem');
    return () => endRenderTracking();
  }, [startRenderTracking, endRenderTracking]);

  const handlePress = useCallback(() => {
    onPress(task);
  }, [task, onPress]);

  const handleToggleStatus = useCallback(() => {
    onToggleStatus(task.id);
  }, [task.id, onToggleStatus]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  const statusColor = useMemo(() => {
    switch (task.status) {
      case 'completed':
        return '#4CAF50';
      case 'in_progress':
        return '#FF9800';
      case 'pending':
      default:
        return '#9E9E9E';
    }
  }, [task.status]);

  return (
    <View style={[styles.taskItem, { borderLeftColor: statusColor }]}>
      <TouchableOpacity onPress={handlePress} style={styles.taskContent}>
        <Text style={styles.taskTitle} numberOfLines={1}>
          {task.title}
        </Text>
        {task.description && (
          <Text style={styles.taskDescription} numberOfLines={2}>
            {task.description}
          </Text>
        )}
        <View style={styles.taskMeta}>
          <Text style={styles.timeEstimate}>
            {task.timeEstimate} min
          </Text>
          <Text style={[styles.status, { color: statusColor }]}>
            {task.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.taskActions}>
        <TouchableOpacity
          onPress={handleToggleStatus}
          style={[styles.actionButton, styles.toggleButton]}
        >
          <Text style={styles.actionButtonText}>
            {task.status === 'completed' ? '↩️' : '✓'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Text style={styles.actionButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

TaskItem.displayName = 'TaskItem';

const OptimizedTaskList = memo(({ 
  tasks, 
  onTaskPress, 
  onToggleTaskStatus, 
  onDeleteTask,
  refreshing,
  onRefresh 
}) => {
  const { optimizeListRendering, startRenderTracking, endRenderTracking } = usePerformanceOptimization();

  React.useEffect(() => {
    startRenderTracking('OptimizedTaskList');
    return () => endRenderTracking();
  }, [startRenderTracking, endRenderTracking]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);
  
  const renderItem = useCallback(({ item }) => (
    <TaskItem
      task={item}
      onPress={onTaskPress}
      onToggleStatus={onToggleTaskStatus}
      onDelete={onDeleteTask}
    />
  ), [onTaskPress, onToggleTaskStatus, onDeleteTask]);

  const listConfig = useMemo(() => 
    optimizeListRendering(tasks, keyExtractor, renderItem), 
    [tasks, keyExtractor, renderItem, optimizeListRendering]
  );

  const handleRefresh = useCallback(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  const emptyComponent = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tasks yet</Text>
      <Text style={styles.emptySubtext}>Tap the + button to create your first task</Text>
    </View>
  ), []);

  return (
    <FlatList
      {...listConfig}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={emptyComponent}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
});

OptimizedTaskList.displayName = 'OptimizedTaskList';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeEstimate: {
    fontSize: 12,
    color: '#999999',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  toggleButton: {
    backgroundColor: '#E3F2FD',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  actionButtonText: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});

export default OptimizedTaskList;
