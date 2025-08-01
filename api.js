import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

// Logs API
export const logsAPI = {
  // Get logs with filters
  getLogs: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const response = await api.get(`/logs?${params.toString()}`);
    return response.data;
  },

  // Get log by ID
  getLogById: async (id) => {
    const response = await api.get(`/logs/${id}`);
    return response.data;
  },

  // Create new log entry
  createLog: async (logData) => {
    const response = await api.post('/logs', logData);
    return response.data;
  },

  // Update log entry
  updateLog: async (id, logData) => {
    const response = await api.put(`/logs/${id}`, logData);
    return response.data;
  },

  // Delete log entry
  deleteLog: async (id) => {
    const response = await api.delete(`/logs/${id}`);
    return response.data;
  },

  // Export logs
  exportLogs: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const response = await api.get(`/logs/export?${params.toString()}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

// Analytics API
export const analyticsAPI = {
  // Get dashboard statistics
  getDashboardStats: async (timeRange = '24h') => {
    const response = await api.get(`/analytics/dashboard?timeRange=${timeRange}`);
    return response.data;
  },

  // Get log trends
  getLogTrends: async (timeRange = '24h') => {
    const response = await api.get(`/analytics/trends?timeRange=${timeRange}`);
    return response.data;
  },

  // Get service distribution
  getServiceDistribution: async (timeRange = '24h') => {
    const response = await api.get(`/analytics/services?timeRange=${timeRange}`);
    return response.data;
  },

  // Get log levels distribution
  getLogLevelsDistribution: async (timeRange = '24h') => {
    const response = await api.get(`/analytics/levels?timeRange=${timeRange}`);
    return response.data;
  },

  // Get hourly distribution
  getHourlyDistribution: async (timeRange = '24h') => {
    const response = await api.get(`/analytics/hourly?timeRange=${timeRange}`);
    return response.data;
  }
};

// Settings API
export const settingsAPI = {
  // Get settings
  getSettings: async () => {
    const response = await api.get('/settings');
    return response.data;
  },

  // Update settings
  updateSettings: async (settings) => {
    const response = await api.put('/settings', settings);
    return response.data;
  },

  // Reset settings to default
  resetSettings: async () => {
    const response = await api.post('/settings/reset');
    return response.data;
  }
};

// Health check API
export const healthAPI = {
  // Check API health
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Get system status
  getSystemStatus: async () => {
    const response = await api.get('/health/status');
    return response.data;
  }
};

// WebSocket connection for real-time logs
export const createWebSocketConnection = (onMessage) => {
  const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001/ws';
  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };

  return ws;
};

export default api; 