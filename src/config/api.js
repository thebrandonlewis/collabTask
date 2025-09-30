/**
 * API Configuration
 * 
 * Configuration for API endpoints and settings
 */

export const API_CONFIG = {
  // Base URL for Strapi backend
  BASE_URL: 'http://localhost:1337/api',
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/local',
    REGISTER: '/auth/local/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/users/me',
  },
  
  // Task List endpoints
  TASK_LISTS: {
    BASE: '/task-lists',
    GET_ALL: '/task-lists',
    GET_ONE: (id) => `/task-lists/${id}`,
    CREATE: '/task-lists',
    UPDATE: (id) => `/task-lists/${id}`,
    DELETE: (id) => `/task-lists/${id}`,
  },
  
  // Task endpoints
  TASKS: {
    BASE: '/tasks',
    GET_ALL: '/tasks',
    GET_ONE: (id) => `/tasks/${id}`,
    CREATE: '/tasks',
    UPDATE: (id) => `/tasks/${id}`,
    DELETE: (id) => `/tasks/${id}`,
    GET_BY_LIST: (taskListId) => `/tasks?taskList=${taskListId}`,
  },
  
  // Request configuration
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const API_ERRORS = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'Access denied. You do not have permission.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
};
