# FlirtIO Testing Documentation 🧪

**Complete testing strategy, procedures, and automation for FlirtIO development**

## 📊 **Testing Overview**

### **Testing Pyramid**
```
    /\
   /  \     E2E Tests (10%)
  /____\    - User journeys
 /      \   - Performance
/________\  - Integration

   /\
  /  \      Integration Tests (20%)
 /____\     - API testing
/      \    - Service connectivity
/________\  - Build validation

    /\
   /  \     Unit Tests (70%)
  /____\    - Components
 /      \   - Services
/________\  - Utilities
```

### **Quality Gates**
- **Code Coverage**: Minimum 70% for all test types
- **Performance**: App load time <5s, DB queries <2s
- **Reliability**: 95%+ test pass rate
- **Security**: No critical vulnerabilities

---

## 🧪 **Unit Testing**

### **Framework & Tools**
- **Jest**: Testing framework
- **React Native Testing Library**: Component testing
- **Supertest**: API testing
- **Coverage**: Istanbul/nyc

### **Test Structure**
```
mobile-app/
├── __tests__/
│   ├── components/
│   │   ├── PersonaCard.test.tsx
│   │   ├── LoadingScreen.test.tsx
│   │   └── OnboardingFlow.test.tsx
│   ├── services/
│   │   ├── SupabaseService.test.ts
│   │   └── PersonaImageService.test.ts
│   └── utils/
│       └── helpers.test.ts
```

### **Example Unit Test**
```typescript
// mobile-app/__tests__/SupabaseService.test.ts
import SupabaseService from '../services/SupabaseService';

describe('SupabaseService', () => {
  describe('sendMessage', () => {
    it('should send a message successfully', async () => {
      // Arrange
      const mockMessage = {
        id: '1',
        user_id: 'test-user',
        persona_key: 'sweetheart',
        message: 'Hello',
        is_user: true,
        created_at: '2024-01-01T00:00:00Z'
      };

      // Act
      const result = await SupabaseService.sendMessage('test-user', 'sweetheart', 'Hello', true);

      // Assert
      expect(result).toEqual(mockMessage);
    });
  });
});
```

### **Running Unit Tests**
```bash
# Run all unit tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test file
npm test -- PersonaCard.test.tsx
```

---

## 🔗 **Integration Testing**

### **What We Test**
- **Database Schema**: Table creation, RLS policies, indexes
- **API Endpoints**: Strapi CMS, Supabase REST API
- **Service Communication**: Mobile app ↔ Backend
- **Build Processes**: TypeScript compilation, dependency resolution

### **Test Categories**

#### **1. Database Integration**
```bash
# Test Supabase tables
test_supabase_tables() {
    # Test messages table
    curl -H "apikey: $SUPABASE_KEY" \
         "$SUPABASE_URL/rest/v1/messages?select=id&limit=1"
    
    # Test analytics_events table
    curl -H "apikey: $SUPABASE_KEY" \
         "$SUPABASE_URL/rest/v1/analytics_events?select=id&limit=1"
}
```

#### **2. API Integration**
```bash
# Test Strapi CMS endpoint
test_api_endpoints() {
    local strapi_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337)
    local expo_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081)
}
```

#### **3. Build Integration**
```bash
# Test mobile app build
test_mobile_build() {
    cd mobile-app
    npx tsc --noEmit
}

# Test CMS build
test_cms_build() {
    cd cms/flirtio-strapi
    npx tsc --noEmit
}
```

### **Running Integration Tests**
```bash
# Run integration tests
npm run test:integration

# Run specific integration test
bash scripts/test-integration.sh
```

---

## 🎯 **End-to-End Testing**

### **User Journey Tests**

#### **1. App Launch Flow**
```bash
test_app_launch() {
    # Check if Expo is running
    lsof -i :8081
    
    # Check if app is accessible
    curl -s -o /dev/null -w "%{http_code}" http://localhost:8081
}
```

#### **2. Persona Selection Flow**
```bash
test_persona_selection() {
    # Check persona data structure
    grep -c "export const" mobile-app/constants/personas.ts
    
    # Verify all three personas are defined
    # Test persona selection interaction
}
```

#### **3. Chat Interaction Flow**
```bash
test_chat_functionality() {
    # Test message insertion
    curl -X POST \
         -H "apikey: $SUPABASE_KEY" \
         -H "Content-Type: application/json" \
         -d '{"user_id":"test-user","persona_key":"sweetheart","message":"Hello test","is_user":true}' \
         "$SUPABASE_URL/rest/v1/messages"
    
    # Test message retrieval
    curl -H "apikey: $SUPABASE_KEY" \
         "$SUPABASE_URL/rest/v1/messages?user_id=eq.test-user&select=*&limit=1"
}
```

#### **4. Performance Validation**
```bash
test_performance() {
    # Test app load time
    local start_time=$(date +%s%3N)
    curl -s http://localhost:8081 >/dev/null
    local end_time=$(date +%s%3N)
    local load_time=$((end_time - start_time))
    
    # Test database query performance
    local db_start_time=$(date +%s%3N)
    curl -s -H "apikey: $SUPABASE_KEY" \
         "$SUPABASE_URL/rest/v1/messages?select=id&limit=1" >/dev/null
    local db_end_time=$(date +%s%3N)
    local db_query_time=$((db_end_time - db_start_time))
}
```

### **Running E2E Tests**
```bash
# Run E2E tests
npm run test:e2e

# Run specific E2E test
bash scripts/test-e2e.sh
```

---

## 🚀 **Test Automation**

### **CI/CD Pipeline**
```yaml
# .github/workflows/test.yml
name: FlirtIO Tests
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22.19.0'
      - name: Install dependencies
        run: npm install
      - name: Run unit tests
        run: npm run test:coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run integration tests
        run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run E2E tests
        run: npm run test:e2e
```

### **Test Scripts**
```bash
# All test commands
npm run test              # Unit tests only
npm run test:services     # Service connectivity tests
npm run test:integration  # Integration tests
npm run test:e2e         # End-to-end tests
npm run test:all         # All tests
npm run test:coverage    # With coverage report
npm run test:watch       # Watch mode
```

---

## 📊 **Test Configuration**

### **Jest Configuration**
```javascript
// jest.config.js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)'],
  collectCoverageFrom: [
    'mobile-app/**/*.{ts,tsx}',
    'cms/flirtio-strapi/src/**/*.{ts,js}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

### **Test Setup**
```javascript
// jest.setup.js
import '@testing-library/jest-native/extend-expect';

// Mock Expo modules
jest.mock('expo', () => ({
  Constants: {
    manifest: {
      extra: {
        supabaseUrl: 'https://test.supabase.co',
        supabaseAnonKey: 'test-key'
      }
    }
  }
}));

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: {}, error: null })
    }))
  }))
}));
```

---

## 🐛 **Debugging Tests**

### **Common Issues**

#### **1. Flaky Tests**
```bash
# Run tests multiple times
npm run test -- --repeat=10

# Run specific test in isolation
npm test -- --testNamePattern="specific test name"
```

#### **2. Slow Tests**
```bash
# Profile test performance
npm run test -- --verbose

# Run tests in parallel
npm run test -- --maxWorkers=4
```

#### **3. Mock Issues**
```bash
# Clear Jest cache
npm run test -- --clearCache

# Reset mocks
jest.clearAllMocks();
```

### **Debug Commands**
```bash
# Run specific test file
npm test -- PersonaCard.test.tsx

# Run tests in debug mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests with verbose output
npm test -- --verbose
```

---

## 📈 **Test Metrics & Reporting**

### **Coverage Reports**
```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

### **Test Results Dashboard**
- **Pass Rate**: Real-time test success rate
- **Coverage**: Code coverage trends
- **Performance**: Test execution time
- **Reliability**: Flaky test identification

### **Automated Reports**
- **Daily**: Test summary report
- **Weekly**: Coverage trend analysis
- **Release**: Full test validation report

---

## 🎯 **Best Practices**

### **Writing Effective Tests**

1. **AAA Pattern**: Arrange, Act, Assert
2. **Descriptive Names**: Clear test descriptions
3. **Single Responsibility**: One assertion per test
4. **Mock External Dependencies**: Isolate units under test
5. **Test Edge Cases**: Error conditions, boundary values

### **Test Data Management**
- **Fixtures**: Reusable test data
- **Factories**: Dynamic test data generation
- **Cleanup**: Proper test isolation

### **Performance Optimization**
- **Parallel Execution**: Run tests concurrently
- **Selective Testing**: Run only changed tests
- **Caching**: Cache dependencies and builds

---

## 📚 **Resources**

### **Documentation**
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Expo Testing Guide](https://docs.expo.dev/guides/testing/)

### **Tools**
- **Jest**: Unit testing framework
- **React Native Testing Library**: Component testing
- **Supertest**: API testing
- **Puppeteer**: E2E testing

---

## 🚀 **Next Steps**

1. **Implement Missing Tests**: Add tests for remaining components
2. **Performance Testing**: Add load and stress testing
3. **Visual Testing**: Add screenshot comparison tests
4. **Accessibility Testing**: Add a11y compliance tests
5. **Security Testing**: Add vulnerability scanning

---

**🎯 Remember: Good tests are the foundation of reliable, maintainable software!**
