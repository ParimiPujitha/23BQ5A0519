import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    logRetention: '30',
    logLevel: 'info',
    autoRefresh: true,
    refreshInterval: '30',
    notifications: {
      errors: true,
      warnings: false,
      info: false
    },
    apiEndpoint: 'http://localhost:3001/api',
    maxLogsPerPage: '100',
    timezone: 'UTC'
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // In a real app, this would load from API or localStorage
      const savedSettings = localStorage.getItem('loggingSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSettingChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('loggingSettings', JSON.stringify(settings));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      logRetention: '30',
      logLevel: 'info',
      autoRefresh: true,
      refreshInterval: '30',
      notifications: {
        errors: true,
        warnings: false,
        info: false
      },
      apiEndpoint: 'http://localhost:3001/api',
      maxLogsPerPage: '100',
      timezone: 'UTC'
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="container">
      <div className="settings-header">
        <h2>Settings</h2>
        <div className="settings-actions">
          <button className="btn btn-secondary" onClick={resetSettings}>
            <RefreshCw size={16} />
            Reset
          </button>
          <button 
            className="btn btn-primary" 
            onClick={saveSettings}
            disabled={loading}
          >
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="success-message">
          <CheckCircle size={16} />
          Settings saved successfully!
        </div>
      )}

      <div className="settings-grid">
        {/* General Settings */}
        <div className="settings-section">
          <h3>General Settings</h3>
          
          <div className="form-group">
            <label className="form-label">API Endpoint</label>
            <input
              type="text"
              className="form-input"
              value={settings.apiEndpoint}
              onChange={(e) => handleSettingChange('apiEndpoint', e.target.value)}
              placeholder="http://localhost:3001/api"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Default Log Level</label>
            <select
              className="form-input"
              value={settings.logLevel}
              onChange={(e) => handleSettingChange('logLevel', e.target.value)}
            >
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Log Retention (days)</label>
            <input
              type="number"
              className="form-input"
              value={settings.logRetention}
              onChange={(e) => handleSettingChange('logRetention', e.target.value)}
              min="1"
              max="365"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Max Logs Per Page</label>
            <input
              type="number"
              className="form-input"
              value={settings.maxLogsPerPage}
              onChange={(e) => handleSettingChange('maxLogsPerPage', e.target.value)}
              min="10"
              max="1000"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Timezone</label>
            <select
              className="form-input"
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>
        </div>

        {/* Display Settings */}
        <div className="settings-section">
          <h3>Display Settings</h3>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.autoRefresh}
                onChange={(e) => handleSettingChange('autoRefresh', e.target.checked)}
              />
              <span>Enable Auto Refresh</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Refresh Interval (seconds)</label>
            <input
              type="number"
              className="form-input"
              value={settings.refreshInterval}
              onChange={(e) => handleSettingChange('refreshInterval', e.target.value)}
              min="10"
              max="300"
              disabled={!settings.autoRefresh}
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h3>Notification Settings</h3>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.errors}
                onChange={(e) => handleSettingChange('notifications.errors', e.target.checked)}
              />
              <span>Error Notifications</span>
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.warnings}
                onChange={(e) => handleSettingChange('notifications.warnings', e.target.checked)}
              />
              <span>Warning Notifications</span>
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications.info}
                onChange={(e) => handleSettingChange('notifications.info', e.target.checked)}
              />
              <span>Info Notifications</span>
            </label>
          </div>
        </div>

        {/* System Information */}
        <div className="settings-section">
          <h3>System Information</h3>
          
          <div className="info-grid">
            <div className="info-item">
              <label>Version</label>
              <span>1.0.0</span>
            </div>
            <div className="info-item">
              <label>Last Updated</label>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <label>Status</label>
              <span className="status-connected">Connected</span>
            </div>
            <div className="info-item">
              <label>API Status</label>
              <span className="status-healthy">Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 