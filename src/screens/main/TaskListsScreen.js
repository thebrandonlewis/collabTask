/**
 * Task Lists Screen
 * 
 * Main screen showing all task lists
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskLists } from '../../store/slices/taskListsSlice';
import { useDataSync } from '../../hooks/useDataSync';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TaskListsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { taskLists, isLoading, error } = useSelector((state) => state.taskLists);
  const { syncTaskLists, isSyncing, syncStatus } = useDataSync();
  const { isConnected } = useNetworkStatus();

  useEffect(() => {
    // Sync data when component mounts
    syncTaskLists();
  }, [syncTaskLists]);

  const renderTaskList = ({ item }) => (
    <TouchableOpacity
      style={styles.taskListCard}
      onPress={() => navigation.navigate('TaskListDetail', { taskList: item })}
    >
      <View style={styles.taskListHeader}>
        <Text style={styles.taskListTitle}>{item.title}</Text>
        <Icon name="chevron-right" size={24} color="#8E8E93" />
      </View>
      
      {item.description && (
        <Text style={styles.taskListDescription}>{item.description}</Text>
      )}
      
      <View style={styles.taskListStats}>
        <Text style={styles.statText}>
          {item.tasks?.length || 0} tasks
        </Text>
        <Text style={styles.statText}>
          {item.isPublic ? 'Public' : 'Private'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleCreateTaskList = () => {
    Alert.alert(
      'Create Task List',
      'This feature will be implemented in the next phase.',
      [{ text: 'OK' }]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading task lists...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>My Task Lists</Text>
          <View style={styles.syncStatus}>
            <Icon 
              name={isConnected ? "wifi" : "wifi-off"} 
              size={16} 
              color={isConnected ? "#34C759" : "#FF3B30"} 
            />
            <Text style={[styles.syncStatusText, { color: isConnected ? "#34C759" : "#FF3B30" }]}>
              {isConnected ? "Online" : "Offline"}
            </Text>
            {isSyncing && (
              <Text style={styles.syncingText}>Syncing...</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateTaskList}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {taskLists.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="list" size={64} color="#8E8E93" />
          <Text style={styles.emptyTitle}>No Task Lists Yet</Text>
          <Text style={styles.emptySubtitle}>
            Create your first task list to start organizing your tasks
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateTaskList}
          >
            <Text style={styles.createButtonText}>Create Task List</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={taskLists}
          renderItem={renderTaskList}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncStatusText: {
    fontSize: 12,
    marginLeft: 4,
  },
  syncingText: {
    fontSize: 12,
    color: '#FF9500',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  taskListCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  taskListDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  taskListStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    color: '#8E8E93',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  createButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TaskListsScreen;
