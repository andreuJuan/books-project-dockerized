import axios from 'axios';

// We don't need the localhost because nginx takes care of redirecting the requests
const API_URL = '/api/v1/';

/**
 * The service that manages login related features
 */
class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post(API_URL + 'auth/login', {
      username,
      password,
    });
    // Store the JWT token in local storage
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(username: string, password: string) {
    return await axios.post(API_URL + 'user', {
      username,
      password,
    });
  }

  getCurrentUserJWT() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr).accessToken;

    return null;
  }
}

export default new AuthService();
