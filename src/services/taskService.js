/**
 * Task Service
 * 
 * Handles task operations with Strapi backend
 */

import apiClient from './apiService';
import { API_CONFIG } from '../config/api';

export const taskService = {
  // Get tasks for a task list
  async getTasks(taskListId) {
    try {
      const response = await apiClient.get(API_CONFIG.TASKS.GET_BY_LIST(taskListId), {
        params: {
          filters: {
            taskList: {
              id: taskListId,
            },
          },
          populate: ['assignedTo', 'taskList'],
          sort: 'createdAt:desc',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single task
  async getTask(id) {
    try {
      const response = await apiClient.get(API_CONFIG.TASKS.GET_ONE(id), {
        params: {
          populate: ['assignedTo', 'taskList'],
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new task
  async createTask(taskListId, title, description, estimatedMinutes, assignedTo = null, dueDate = null) {
    try {
      const response = await apiClient.post(API_CONFIG.TASKS.CREATE, {
        data: {
          title,
          description,
          estimatedMinutes,
          status: 'pending',
          taskList: taskListId,
          assignedTo,
          dueDate,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task
  async updateTask(id, title, description, estimatedMinutes, status, assignedTo, dueDate) {
    try {
      const response = await apiClient.put(API_CONFIG.TASKS.UPDATE(id), {
        data: {
          title,
          description,
          estimatedMinutes,
          status,
          assignedTo,
          dueDate,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete task
  async deleteTask(id) {
    try {
      await apiClient.delete(API_CONFIG.TASKS.DELETE(id));
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Update task status
  async updateTaskStatus(id, status) {
    try {
      const response = await apiClient.put(API_CONFIG.TASKS.UPDATE(id), {
        data: {
          status,
          completedAt: status === 'completed' ? new Date().toISOString() : null,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get tasks by status
  async getTasksByStatus(taskListId, status) {
    try {
      const response = await apiClient.get('/tasks', {
        params: {
          filters: {
            taskList: {
              id: taskListId,
            },
            status,
          },
          populate: ['assignedTo', 'taskList'],
          sort: 'createdAt:desc',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get tasks assigned to user
  async getTasksAssignedToUser(userId) {
    try {
      const response = await apiClient.get('/tasks', {
        params: {
          filters: {
            assignedTo: {
              id: userId,
            },
          },
          populate: ['assignedTo', 'taskList'],
          sort: 'createdAt:desc',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
