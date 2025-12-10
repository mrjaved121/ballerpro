// Quick API Test Script
// Run this to verify backend is accessible from frontend

import apiClient from './frontend/src/services/api/api';
import API_CONFIG from './frontend/src/config/api';

async function testBackendConnection() {
  console.log('Testing backend connection...');
  console.log('API Base URL:', API_CONFIG.BASE_URL);
  
  try {
    // Test health endpoint (if available)
    const response = await apiClient.get('/health');
    console.log('✅ Backend is reachable!');
    console.log('Response:', response.data);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to connect to backend');
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused. Is the backend running on port 5000?');
    } else if (error.message === 'Network Error') {
      console.error('Network error. Check your connection and backend URL.');
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

async function testRegisterEndpoint() {
  console.log('\nTesting register endpoint...');
  
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    name: 'Test User'
  };
  
  try {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      testUser
    );
    
    console.log('✅ Register endpoint works!');
    console.log('User created:', response.data.data?.user?.email);
    return true;
  } catch (error: any) {
    console.error('❌ Register endpoint failed');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data?.message);
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('=== Backend API Tests ===\n');
  
  const backendReachable = await testBackendConnection();
  
  if (backendReachable) {
    await testRegisterEndpoint();
  } else {
    console.log('\n⚠️  Backend not reachable. Skipping endpoint tests.');
    console.log('To start backend: cd backend && npm start');
  }
  
  console.log('\n=== Tests Complete ===');
}

// Export for use
export { testBackendConnection, testRegisterEndpoint, runTests };

