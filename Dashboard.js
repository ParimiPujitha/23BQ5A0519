import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLogs: 0,
    errorLogs: 0,
    warningLogs: 0,
    infoLogs: 0
  });
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await api.getDashboardData();
        
        // Mock data for demonstration
        setTimeout(() => {
          setStats({
            totalLogs: 1247,
            errorLogs: 23,
            warningLogs: 45,
            infoLogs: 1179
          });
          
          setRecentLogs([
            {
              id: 1,
              level: 'error',
              message: 'Database connection failed',
              timestamp: new Date(),
              service: 'user-service'
            },
            {
              id: 2,
              level: 'warning',
              message: 'High memory usage detected',
              timestamp: new Date(Date.now() - 300000),
              service: 'system-monitor'
            },
            {
              id: 3,
              level: 'info',
              message: 'User login successful',
              timestamp: new Date(Date.now() - 600000),
              service: 'auth-service'
            },
            {
              id: 4,
              level: 'error',
              message: 'API rate limit exceeded',
              timestamp: new Date(Date.now() - 900000),
              service: 'api-gateway'
            },
            {
              id: 5,
              level: 'info',
              message: 'Cache updated successfully',
              timestamp: new Date(Date.now() - 1200000),
              service: 'cache-service'
            }
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <AlertTriangle size={16} color="#dc3545" />;
      case 'warning':
        return <AlertTriangle size={16} color="#ffc107" />;
      case 'info':
        return <Info size={16} color="#17a2b8" />;
      default:
        return <CheckCircle size={16} color="#28a745" />;
    }
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'error':
        return 'badge-error';
      case 'warning':
        return 'badge-warning';
      case 'info':
        return 'badge-info';
      default:
        return 'badge-success';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      
      {/* Statistics Cards */}
      <div className="dashboard-grid">
        <div className="stats-card">
          <div className="stats-header">
            <TrendingUp size={24} color="#007bff" />
            <h3>Total Logs</h3>
          </div>
          <div className="stats-value">{stats.totalLogs.toLocaleString()}</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-header">
            <AlertTriangle size={24} color="#dc3545" />
            <h3>Errors</h3>
          </div>
          <div className="stats-value error">{stats.errorLogs}</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-header">
            <AlertTriangle size={24} color="#ffc107" />
            <h3>Warnings</h3>
          </div>
          <div className="stats-value warning">{stats.warningLogs}</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-header">
            <Info size={24} color="#17a2b8" />
            <h3>Info Logs</h3>
          </div>
          <div className="stats-value info">{stats.infoLogs}</div>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="card">
        <h3>Recent Logs</h3>
        <div className="recent-logs">
          {recentLogs.map((log) => (
            <div key={log.id} className={`log-entry ${log.level}`}>
              <div className="log-header">
                <div className="log-level-info">
                  {getLevelIcon(log.level)}
                  <span className={`badge ${getLevelBadgeClass(log.level)}`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="log-service">{log.service}</span>
                </div>
                <span className="log-timestamp">
                  {format(log.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                </span>
              </div>
              <div className="log-message">{log.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 