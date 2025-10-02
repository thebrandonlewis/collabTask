import { authService } from '../../services/authService';

// Mock axios
const mockAxios = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

jest.mock('axios', () => ({
  create: jest.fn(() => mockAxios),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockResponse = {
        data: {
          user: { id: 1, username: 'testuser', email: 'test@example.com' },
          jwt: 'mock-jwt-token',
        },
      };

      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.login('test@example.com', 'password123');

      expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/local', {
        identifier: 'test@example.com',
        password: 'password123',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle login error', async () => {
      const errorMessage = 'Invalid credentials';
      mockAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(authService.login('test@example.com', 'wrongpassword')).rejects.toThrow(errorMessage);
    });
  });

  describe('register', () => {
    it('should register successfully with valid data', async () => {
      const mockResponse = {
        data: {
          user: { id: 1, username: 'newuser', email: 'new@example.com' },
          jwt: 'mock-jwt-token',
        },
      };

      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.register('newuser', 'new@example.com', 'password123');

      expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/local/register', {
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle registration error', async () => {
      const errorMessage = 'Username already exists';
      mockAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(authService.register('existinguser', 'existing@example.com', 'password123')).rejects.toThrow(errorMessage);
    });
  });

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
      const mockResponse = { data: mockUser };

      mockAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await authService.getCurrentUser();

      expect(mockAxios.get).toHaveBeenCalledWith('/api/users/me');
      expect(result).toEqual(mockUser);
    });

    it('should handle getCurrentUser error', async () => {
      const errorMessage = 'Unauthorized';
      mockAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(authService.getCurrentUser()).rejects.toThrow(errorMessage);
    });
  });

  describe('forgotPassword', () => {
    it('should send forgot password email successfully', async () => {
      const mockResponse = { data: { ok: true } };
      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.forgotPassword('test@example.com');

      expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/forgot-password', {
        email: 'test@example.com',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle forgot password error', async () => {
      const errorMessage = 'Email not found';
      mockAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(authService.forgotPassword('nonexistent@example.com')).rejects.toThrow(errorMessage);
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const mockResponse = { data: { ok: true } };
      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.resetPassword('reset-token', 'newpassword123');

      expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/reset-password', {
        code: 'reset-token',
        password: 'newpassword123',
        passwordConfirmation: 'newpassword123',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle reset password error', async () => {
      const errorMessage = 'Invalid reset token';
      mockAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(authService.resetPassword('invalid-token', 'newpassword123')).rejects.toThrow(errorMessage);
    });
  });
});
