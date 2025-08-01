import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import './LogViewer.css';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    level: 'all',
    service: 'all',
    search: '',
    startDate: '',
    endDate: ''
  });

  const [services] = useState([
    'user-service',
    'auth-service',
    'api-gateway',
    'system-monitor',
    'cache-service',
    'database-service'
  ]);

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [logs, filters]);

  const fetchLogs = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        const mockLogs = generateMockLogs();
        setLogs(mockLogs);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLoading(false);
    }
  };

  const generateMockLogs = () => {
    const levels = ['error', 'warning', 'info', 'debug'];
    const messages = [
      'Database connection established',
      'User authentication failed',
      'API request processed successfully',
      'Memory usage exceeded threshold',
      'Cache miss occurred',
      'Rate limit exceeded',
      'Service health check passed',
      'Configuration updated',
      'Backup completed successfully',
      'Security alert triggered'
    ];

    return Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      level: levels[Math.floor(Math.random() * levels.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      service: services[Math.floor(Math.random() * services.length)],
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Last 7 days
      metadata: {
        userId: Math.floor(Math.random() * 1000),
        requestId: `req-${Math.random().toString(36).substr(2, 9)}`,
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`
      }
    }));
  };

  const applyFilters = () => {
    let filtered = [...logs];

    if (filters.level !== 'all') {
      filtered = filtered.filter(log => log.level === filters.level);
    }

    if (filters.service !== 'all') {
      filtered = filtered.filter(log => log.service === filters.service);
    }

    if (filters.search) {
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.service.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(log => log.timestamp >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filtered = filtered.filter(log => log.timestamp <= new Date(filters.endDate));
    }

    setFilteredLogs(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      level: 'all',
      service: 'all',
      search: '',
      startDate: '',
      endDate: ''
    });
  };

  const exportLogs = () => {
    const csvContent = [
      'Timestamp,Level,Service,Message',
      ...filteredLogs.map(log =>
        `${format(log.timestamp, 'yyyy-MM-dd HH:mm:ss')},${log.level},${log.service},"${log.message}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'error': return 'badge-error';
      case 'warning': return 'badge-warning';
      case 'info': return 'badge-info';
      case 'debug': return 'badge-secondary';
      default: return 'badge-success';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading logs...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="log-viewer-header">
        <h2>Log Viewer</h2>
        <div className="log-viewer-actions">
          <button className="btn btn-secondary" onClick={fetchLogs}>
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="btn btn-primary" onClick={exportLogs}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filters-header">
          <Filter size={20} />
          <h3>Filters</h3>
        </div>
        
        <div className="filters-row">
          <div className="filter-group">
            <label className="form-label">Search</label>
            <div className="search-input">
              <Search size={16} />
              <input
                type="text"
                className="form-input"
                placeholder="Search logs..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="form-label">Level</label>
            <select
              className="form-input"
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="form-label">Service</label>
            <select
              className="form-input"
              value={filters.service}
              onChange={(e) => handleFilterChange('service', e.target.value)}
            >
              <option value="all">All Services</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-input"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-input"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing {filteredLogs.length} of {logs.length} logs</p>
      </div>

      {/* Logs Table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Level</th>
              <th>Service</th>
              <th>Message</th>
              <th>Metadata</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className={`log-row ${log.level}`}>
                <td>{format(log.timestamp, 'MMM dd, yyyy HH:mm:ss')}</td>
                <td>
                  <span className={`badge ${getLevelBadgeClass(log.level)}`}>
                    {log.level.toUpperCase()}
                  </span>
                </td>
                <td>{log.service}</td>
                <td>{log.message}</td>
                <td>
                  <details>
                    <summary>View Details</summary>
                    <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLogs.length === 0 && (
          <div className="no-results">
            <p>No logs found matching the current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogViewer; 