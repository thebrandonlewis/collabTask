import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useAuth } from '../../hooks/useAuth';

// Mock the auth service
jest.mock('../../services/authService', () => ({
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const TestWrapper = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('handles successful login', async () => {
    const mockLogin = require('../../services/authService').login;
    const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
    const mockJwt = 'mock-jwt-token';

    mockLogin.mockResolvedValueOnce({
      data: { user: mockUser, jwt: mockJwt },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBe(null);
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('handles login error', async () => {
    const mockLogin = require('../../services/authService').login;
    const errorMessage = 'Invalid credentials';
    mockLogin.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.login('test@example.com', 'wrongpassword');
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
    expect(result.current.error).toBe(errorMessage);
  });

  it('handles successful registration', async () => {
    const mockRegister = require('../../services/authService').register;
    const mockUser = { id: 1, username: 'newuser', email: 'new@example.com' };
    const mockJwt = 'mock-jwt-token';

    mockRegister.mockResolvedValueOnce({
      data: { user: mockUser, jwt: mockJwt },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.register('newuser', 'new@example.com', 'password123');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBe(null);
    expect(mockRegister).toHaveBeenCalledWith('newuser', 'new@example.com', 'password123');
  });

  it('handles logout', async () => {
    const mockLogout = require('../../services/authService').logout;
    mockLogout.mockResolvedValueOnce();

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    // First login to set authenticated state
    const mockLogin = require('../../services/authService').login;
    mockLogin.mockResolvedValueOnce({
      data: { user: { id: 1 }, jwt: 'token' },
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isAuthenticated).toBe(true);

    // Then logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
    expect(mockLogout).toHaveBeenCalled();
  });

  it('shows loading state during authentication', async () => {
    const mockLogin = require('../../services/authService').login;
    let resolveLogin;
    const loginPromise = new Promise((resolve) => {
      resolveLogin = resolve;
    });
    mockLogin.mockReturnValueOnce(loginPromise);

    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isLoading).toBe(true);

    // Resolve the login
    await act(async () => {
      resolveLogin({ data: { user: { id: 1 }, jwt: 'token' } });
    });

    expect(result.current.isLoading).toBe(false);
  });
});
