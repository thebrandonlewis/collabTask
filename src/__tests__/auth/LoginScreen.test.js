import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '../../store/store';
import LoginScreen from '../../screens/auth/LoginScreen';

// Mock the auth service
jest.mock('../../services/authService', () => ({
  login: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const TestWrapper = ({ children }) => (
  <Provider store={store}>
    <NavigationContainer>
      {children}
    </NavigationContainer>
  </Provider>
);

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Email or Username')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    const loginButton = screen.getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter your email or username')).toBeTruthy();
      expect(screen.getByText('Please enter your password')).toBeTruthy();
    });
  });

  it('handles successful login', async () => {
    const mockLogin = require('../../services/authService').login;
    mockLogin.mockResolvedValueOnce({
      data: {
        user: { id: 1, username: 'testuser' },
        jwt: 'mock-jwt-token',
      },
    });

    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText('Email or Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('handles login error', async () => {
    const mockLogin = require('../../services/authService').login;
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText('Email or Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Login failed. Please check your credentials.')).toBeTruthy();
    });
  });
});
