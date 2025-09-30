/**
 * Task List Service
 * 
 * Handles task list operations with Strapi backend
 */

import apiClient from './apiService';
import { API_CONFIG } from '../config/api';

export const taskListService = {
  // Get all task lists for current user
  async getTaskLists() {
    try {
      const response = await apiClient.get(API_CONFIG.TASK_LISTS.GET_ALL, {
        params: {
          populate: ['tasks', 'owner'],
          sort: 'createdAt:desc',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single task list
  async getTaskList(id) {
    try {
      const response = await apiClient.get(API_CONFIG.TASK_LISTS.GET_ONE(id), {
        params: {
          populate: ['tasks', 'owner', 'collaborators'],
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new task list
  async createTaskList(title, description, isPublic = false) {
    try {
      const response = await apiClient.post(API_CONFIG.TASK_LISTS.CREATE, {
        data: {
          title,
          description,
          isPublic,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task list
  async updateTaskList(id, title, description, isPublic) {
    try {
      const response = await apiClient.put(API_CONFIG.TASK_LISTS.UPDATE(id), {
        data: {
          title,
          description,
          isPublic,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete task list
  async deleteTaskList(id) {
    try {
      await apiClient.delete(API_CONFIG.TASK_LISTS.DELETE(id));
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Add collaborator to task list
  async addCollaborator(taskListId, userId) {
    try {
      const response = await apiClient.put(`/task-lists/${taskListId}`, {
        data: {
          collaborators: {
            connect: [userId],
          },
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove collaborator from task list
  async removeCollaborator(taskListId, userId) {
    try {
      const response = await apiClient.put(`/task-lists/${taskListId}`, {
        data: {
          collaborators: {
            disconnect: [userId],
          },
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
