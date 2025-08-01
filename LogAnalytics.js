import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, Clock, Activity } from 'lucide-react';
import './LogAnalytics.css';

const LogAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    logLevels: [],
    logTrends: [],
    serviceDistribution: [],
    hourlyDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        const mockData = generateMockAnalyticsData();
        setAnalyticsData(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setLoading(false);
    }
  };

  const generateMockAnalyticsData = () => {
    // Log levels distribution
    const logLevels = [
      { name: 'Error', value: 23, color: '#dc3545' },
      { name: 'Warning', value: 45, color: '#ffc107' },
      { name: 'Info', value: 1179, color: '#17a2b8' },
      { name: 'Debug', value: 156, color: '#6c757d' }
    ];

    // Log trends over time
    const logTrends = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      errors: Math.floor(Math.random() * 5),
      warnings: Math.floor(Math.random() * 10),
      info: Math.floor(Math.random() * 50) + 20
    }));

    // Service distribution
    const serviceDistribution = [
      { name: 'user-service', value: 245, color: '#007bff' },
      { name: 'auth-service', value: 189, color: '#28a745' },
      { name: 'api-gateway', value: 312, color: '#ffc107' },
      { name: 'system-monitor', value: 156, color: '#dc3545' },
      { name: 'cache-service', value: 98, color: '#17a2b8' },
      { name: 'database-service', value: 247, color: '#6f42c1' }
    ];

    // Hourly distribution
    const hourlyDistribution = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      logs: Math.floor(Math.random() * 100) + 20
    }));

    return {
      logLevels,
      logTrends,
      serviceDistribution,
      hourlyDistribution
    };
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="analytics-header">
        <h2>Log Analytics</h2>
        <div className="time-range-selector">
          <label className="form-label">Time Range:</label>
          <select
            className="form-input"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <Activity size={24} color="#007bff" />
          </div>
          <div className="summary-content">
            <h3>Total Logs</h3>
            <p className="summary-value">1,403</p>
            <p className="summary-change positive">+12.5% from yesterday</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <AlertTriangle size={24} color="#dc3545" />
          </div>
          <div className="summary-content">
            <h3>Error Rate</h3>
            <p className="summary-value">1.6%</p>
            <p className="summary-change negative">+0.3% from yesterday</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <Clock size={24} color="#ffc107" />
          </div>
          <div className="summary-content">
            <h3>Avg Response Time</h3>
            <p className="summary-value">245ms</p>
            <p className="summary-change positive">-15ms from yesterday</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <TrendingUp size={24} color="#28a745" />
          </div>
          <div className="summary-content">
            <h3>Success Rate</h3>
            <p className="summary-value">98.4%</p>
            <p className="summary-change positive">+0.2% from yesterday</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Log Levels Distribution */}
        <div className="chart-container">
          <div className="chart-title">Log Levels Distribution</div>
          <PieChart width={400} height={300}>
            <Pie
              data={analyticsData.logLevels}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {analyticsData.logLevels.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Log Trends */}
        <div className="chart-container">
          <div className="chart-title">Log Trends (Last 24 Hours)</div>
          <LineChart width={500} height={300} data={analyticsData.logTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="errors" stroke="#dc3545" strokeWidth={2} />
            <Line type="monotone" dataKey="warnings" stroke="#ffc107" strokeWidth={2} />
            <Line type="monotone" dataKey="info" stroke="#17a2b8" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Service Distribution */}
        <div className="chart-container">
          <div className="chart-title">Logs by Service</div>
          <BarChart width={500} height={300} data={analyticsData.serviceDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" />
          </BarChart>
        </div>

        {/* Hourly Distribution */}
        <div className="chart-container">
          <div className="chart-title">Hourly Log Volume</div>
          <BarChart width={500} height={300} data={analyticsData.hourlyDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="logs" fill="#28a745" />
          </BarChart>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-section">
        <h3>Key Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>Peak Log Rate</h4>
            <p>1,247 logs/hour at 14:00</p>
          </div>
          <div className="metric-card">
            <h4>Most Active Service</h4>
            <p>api-gateway (312 logs)</p>
          </div>
          <div className="metric-card">
            <h4>Error Hotspots</h4>
            <p>user-service (8 errors)</p>
          </div>
          <div className="metric-card">
            <h4>Response Time Trend</h4>
            <p>Improving (-15ms avg)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogAnalytics; 