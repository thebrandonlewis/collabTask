import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '../../store/store';
import App from '../../App';

// Mock all external dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

jest.mock('../../services/authService', () => ({
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
}));

jest.mock('../../services/taskListService', () => ({
  getTaskLists: jest.fn(),
  createTaskList: jest.fn(),
  updateTaskList: jest.fn(),
  deleteTaskList: jest.fn(),
}));

jest.mock('../../services/taskService', () => ({
  getTasks: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

const TestWrapper = ({ children }) => (
  <Provider store={store}>
    <NavigationContainer>
      {children}
    </NavigationContainer>
  </Provider>
);

describe('Complete User Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication Flow', () => {
    it('should complete full registration and login flow', async () => {
      const mockRegister = require('../../services/authService').register;
      const mockLogin = require('../../services/authService').login;
      const mockGetCurrentUser = require('../../services/authService').getCurrentUser;

      // Mock successful registration
      mockRegister.mockResolvedValueOnce({
        data: {
          user: { id: 1, username: 'newuser', email: 'new@example.com' },
          jwt: 'mock-jwt-token',
        },
      });

      // Mock successful login
      mockLogin.mockResolvedValueOnce({
        data: {
          user: { id: 1, username: 'newuser', email: 'new@example.com' },
          jwt: 'mock-jwt-token',
        },
      });

      // Mock getCurrentUser for session restoration
      mockGetCurrentUser.mockResolvedValueOnce({
        id: 1, username: 'newuser', email: 'new@example.com'
      });

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Navigate to registration
      const registerButton = screen.getByText('Register');
      fireEvent.press(registerButton);

      // Fill registration form
      const usernameInput = screen.getByPlaceholderText('Username');
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

      fireEvent.changeText(usernameInput, 'newuser');
      fireEvent.changeText(emailInput, 'new@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.changeText(confirmPasswordInput, 'password123');

      // Submit registration
      const submitButton = screen.getByText('Register');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith('newuser', 'new@example.com', 'password123');
      });

      // Should navigate to login after successful registration
      await waitFor(() => {
        expect(screen.getByText('Login')).toBeTruthy();
      });
    });

    it('should handle login with existing user', async () => {
      const mockLogin = require('../../services/authService').login;
      const mockGetCurrentUser = require('../../services/authService').getCurrentUser;

      // Mock successful login
      mockLogin.mockResolvedValueOnce({
        data: {
          user: { id: 1, username: 'existinguser', email: 'existing@example.com' },
          jwt: 'mock-jwt-token',
        },
      });

      // Mock getCurrentUser for session restoration
      mockGetCurrentUser.mockResolvedValueOnce({
        id: 1, username: 'existinguser', email: 'existing@example.com'
      });

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Fill login form
      const emailInput = screen.getByPlaceholderText('Email or Username');
      const passwordInput = screen.getByPlaceholderText('Password');

      fireEvent.changeText(emailInput, 'existing@example.com');
      fireEvent.changeText(passwordInput, 'password123');

      // Submit login
      const loginButton = screen.getByText('Login');
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('existing@example.com', 'password123');
      });
    });
  });

  describe('Task Management Flow', () => {
    it('should create, update, and delete task lists', async () => {
      const mockGetTaskLists = require('../../services/taskListService').getTaskLists;
      const mockCreateTaskList = require('../../services/taskListService').createTaskList;
      const mockUpdateTaskList = require('../../services/taskListService').updateTaskList;
      const mockDeleteTaskList = require('../../services/taskListService').deleteTaskList;

      // Mock initial task lists
      mockGetTaskLists.mockResolvedValueOnce({
        data: [
          { id: 1, name: 'Work Tasks', description: 'Tasks for work', color: '#FF6B6B' },
          { id: 2, name: 'Personal Tasks', description: 'Personal tasks', color: '#4ECDC4' },
        ],
      });

      // Mock create task list
      mockCreateTaskList.mockResolvedValueOnce({
        data: { id: 3, name: 'New List', description: 'New task list', color: '#45B7D1' },
      });

      // Mock update task list
      mockUpdateTaskList.mockResolvedValueOnce({
        data: { id: 1, name: 'Updated Work Tasks', description: 'Updated description', color: '#FF6B6B' },
      });

      // Mock delete task list
      mockDeleteTaskList.mockResolvedValueOnce({ data: { id: 2 } });

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Should load task lists
      await waitFor(() => {
        expect(mockGetTaskLists).toHaveBeenCalled();
      });

      // Create new task list
      const createButton = screen.getByText('Create Task List');
      fireEvent.press(createButton);

      const nameInput = screen.getByPlaceholderText('Task List Name');
      const descriptionInput = screen.getByPlaceholderText('Description');

      fireEvent.changeText(nameInput, 'New List');
      fireEvent.changeText(descriptionInput, 'New task list');

      const saveButton = screen.getByText('Save');
      fireEvent.press(saveButton);

      await waitFor(() => {
        expect(mockCreateTaskList).toHaveBeenCalledWith({
          name: 'New List',
          description: 'New task list',
          color: expect.any(String),
        });
      });

      // Update existing task list
      const editButton = screen.getByTestId('edit-task-list-1');
      fireEvent.press(editButton);

      const editNameInput = screen.getByDisplayValue('Work Tasks');
      fireEvent.changeText(editNameInput, 'Updated Work Tasks');

      const updateButton = screen.getByText('Update');
      fireEvent.press(updateButton);

      await waitFor(() => {
        expect(mockUpdateTaskList).toHaveBeenCalledWith(1, {
          name: 'Updated Work Tasks',
          description: 'Tasks for work',
          color: '#FF6B6B',
        });
      });

      // Delete task list
      const deleteButton = screen.getByTestId('delete-task-list-2');
      fireEvent.press(deleteButton);

      const confirmDeleteButton = screen.getByText('Delete');
      fireEvent.press(confirmDeleteButton);

      await waitFor(() => {
        expect(mockDeleteTaskList).toHaveBeenCalledWith(2);
      });
    });

    it('should create, update, and delete tasks within a task list', async () => {
      const mockGetTasks = require('../../services/taskService').getTasks;
      const mockCreateTask = require('../../services/taskService').createTask;
      const mockUpdateTask = require('../../services/taskService').updateTask;
      const mockDeleteTask = require('../../services/taskService').deleteTask;

      // Mock initial tasks
      mockGetTasks.mockResolvedValueOnce({
        data: [
          { id: 1, title: 'Task 1', description: 'First task', status: 'pending', timeEstimate: 30 },
          { id: 2, title: 'Task 2', description: 'Second task', status: 'in_progress', timeEstimate: 60 },
        ],
      });

      // Mock create task
      mockCreateTask.mockResolvedValueOnce({
        data: { id: 3, title: 'New Task', description: 'New task description', status: 'pending', timeEstimate: 45 },
      });

      // Mock update task
      mockUpdateTask.mockResolvedValueOnce({
        data: { id: 1, title: 'Updated Task 1', description: 'Updated description', status: 'completed', timeEstimate: 30 },
      });

      // Mock delete task
      mockDeleteTask.mockResolvedValueOnce({ data: { id: 2 } });

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Navigate to a task list
      const taskListButton = screen.getByText('Work Tasks');
      fireEvent.press(taskListButton);

      // Should load tasks
      await waitFor(() => {
        expect(mockGetTasks).toHaveBeenCalledWith(1);
      });

      // Create new task
      const createTaskButton = screen.getByText('Add Task');
      fireEvent.press(createTaskButton);

      const titleInput = screen.getByPlaceholderText('Task Title');
      const descriptionInput = screen.getByPlaceholderText('Task Description');
      const timeEstimateInput = screen.getByPlaceholderText('Time Estimate (minutes)');

      fireEvent.changeText(titleInput, 'New Task');
      fireEvent.changeText(descriptionInput, 'New task description');
      fireEvent.changeText(timeEstimateInput, '45');

      const saveTaskButton = screen.getByText('Save Task');
      fireEvent.press(saveTaskButton);

      await waitFor(() => {
        expect(mockCreateTask).toHaveBeenCalledWith({
          title: 'New Task',
          description: 'New task description',
          timeEstimate: 45,
          taskList: 1,
        });
      });

      // Update existing task
      const editTaskButton = screen.getByTestId('edit-task-1');
      fireEvent.press(editTaskButton);

      const editTitleInput = screen.getByDisplayValue('Task 1');
      fireEvent.changeText(editTitleInput, 'Updated Task 1');

      const statusPicker = screen.getByTestId('status-picker');
      fireEvent.press(statusPicker);
      const completedOption = screen.getByText('Completed');
      fireEvent.press(completedOption);

      const updateTaskButton = screen.getByText('Update Task');
      fireEvent.press(updateTaskButton);

      await waitFor(() => {
        expect(mockUpdateTask).toHaveBeenCalledWith(1, {
          title: 'Updated Task 1',
          description: 'First task',
          status: 'completed',
          timeEstimate: 30,
        });
      });

      // Delete task
      const deleteTaskButton = screen.getByTestId('delete-task-2');
      fireEvent.press(deleteTaskButton);

      const confirmDeleteTaskButton = screen.getByText('Delete');
      fireEvent.press(confirmDeleteTaskButton);

      await waitFor(() => {
        expect(mockDeleteTask).toHaveBeenCalledWith(2);
      });
    });
  });

  describe('Offline Functionality', () => {
    it('should handle offline mode and sync when back online', async () => {
      const mockGetTaskLists = require('../../services/taskListService').getTaskLists;
      const mockCreateTaskList = require('../../services/taskListService').createTaskList;

      // Mock network going offline
      const NetInfo = require('@react-native-community/netinfo');
      NetInfo.fetch.mockResolvedValueOnce({ isConnected: false });

      // Mock network coming back online
      NetInfo.fetch.mockResolvedValueOnce({ isConnected: true });

      // Mock successful sync
      mockGetTaskLists.mockResolvedValueOnce({
        data: [
          { id: 1, name: 'Work Tasks', description: 'Tasks for work', color: '#FF6B6B' },
        ],
      });

      mockCreateTaskList.mockResolvedValueOnce({
        data: { id: 2, name: 'Offline Created List', description: 'Created while offline', color: '#4ECDC4' },
      });

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Should show offline indicator
      await waitFor(() => {
        expect(screen.getByText('Offline')).toBeTruthy();
      });

      // Create task list while offline (should be queued)
      const createButton = screen.getByText('Create Task List');
      fireEvent.press(createButton);

      const nameInput = screen.getByPlaceholderText('Task List Name');
      fireEvent.changeText(nameInput, 'Offline Created List');

      const saveButton = screen.getByText('Save');
      fireEvent.press(saveButton);

      // Should show sync pending indicator
      await waitFor(() => {
        expect(screen.getByText('Sync Pending')).toBeTruthy();
      });

      // Simulate network coming back online
      const networkStatus = require('../../hooks/useNetworkStatus');
      networkStatus.useNetworkStatus = jest.fn(() => true);

      // Should automatically sync
      await waitFor(() => {
        expect(mockCreateTaskList).toHaveBeenCalled();
      });
    });
  });
});
