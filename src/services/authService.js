/**
 * Authentication Service
 * 
 * Handles user authentication with Strapi backend
 */

import apiClient from './apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api';

export const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await apiClient.post(API_CONFIG.AUTH.LOGIN, {
        identifier: email,
        password: password,
      });

      const { user, jwt } = response.data;
      
      // Store token and user data
      await AsyncStorage.setItem('authToken', jwt);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return {
        data: {
          user,
          token: jwt,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  // Register user
  async register(email, password, username) {
    try {
      const response = await apiClient.post(API_CONFIG.AUTH.REGISTER, {
        username,
        email,
        password,
      });

      const { user, jwt } = response.data;
      
      // Store token and user data
      await AsyncStorage.setItem('authToken', jwt);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return {
        data: {
          user,
          token: jwt,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  async logout() {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        return null;
      }

      const response = await apiClient.get(API_CONFIG.AUTH.ME);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiClient.post(API_CONFIG.AUTH.FORGOT_PASSWORD, {
        email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  async resetPassword(code, password, passwordConfirmation) {
    try {
      const response = await apiClient.post(API_CONFIG.AUTH.RESET_PASSWORD, {
        code,
        password,
        passwordConfirmation,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return !!token;
    } catch (error) {
      return false;
    }
  },
};
