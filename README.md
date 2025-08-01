# Logging Middleware Frontend

A modern React-based dashboard for monitoring and managing application logs. This frontend provides a comprehensive interface for viewing, filtering, analyzing, and managing logs from your logging middleware system.

## Features

### 📊 Dashboard
- Real-time statistics overview
- Recent logs display
- Quick metrics and insights
- Visual indicators for different log levels

### 📋 Log Viewer
- Advanced filtering by level, service, date range
- Search functionality across log messages
- Export logs to CSV format
- Detailed log entry view with metadata
- Responsive table design

### 📈 Analytics
- Interactive charts and graphs
- Log level distribution (pie chart)
- Time-based trends (line charts)
- Service distribution analysis
- Hourly log volume tracking
- Key performance metrics

### ⚙️ Settings
- API endpoint configuration
- Log retention settings
- Display preferences
- Notification settings
- System information

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Chart library for analytics
- **Lucide React** - Icon library
- **Date-fns** - Date utility library
- **CSS Grid & Flexbox** - Modern CSS layout

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.js    # Main dashboard view
│   ├── LogViewer.js    # Log viewing and filtering
│   ├── LogAnalytics.js # Analytics and charts
│   ├── Settings.js     # Configuration settings
│   └── Navbar.js       # Navigation component
├── services/           # API services
│   └── api.js         # API client and endpoints
├── App.js             # Main app component
├── index.js           # App entry point
└── index.css          # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd logging-middleware-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables (optional):
```bash
# Create .env file
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001/ws
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## API Integration

The frontend expects a RESTful API with the following endpoints:

### Logs API
- `GET /api/logs` - Get logs with filters
- `GET /api/logs/:id` - Get specific log
- `POST /api/logs` - Create new log
- `PUT /api/logs/:id` - Update log
- `DELETE /api/logs/:id` - Delete log
- `GET /api/logs/export` - Export logs

### Analytics API
- `GET /api/analytics/dashboard` - Dashboard statistics
- `GET /api/analytics/trends` - Log trends
- `GET /api/analytics/services` - Service distribution
- `GET /api/analytics/levels` - Log levels distribution
- `GET /api/analytics/hourly` - Hourly distribution

### Settings API
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings
- `POST /api/settings/reset` - Reset to defaults

### Health API
- `GET /api/health` - Health check
- `GET /api/health/status` - System status

## Configuration

### Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:3001/api)
- `REACT_APP_WS_URL` - WebSocket URL for real-time updates (default: ws://localhost:3001/ws)

### Settings

The application includes configurable settings:

- **API Endpoint** - Backend API URL
- **Log Retention** - Days to keep logs
- **Default Log Level** - Minimum log level to display
- **Auto Refresh** - Enable/disable automatic refresh
- **Refresh Interval** - Time between refreshes
- **Notifications** - Configure notification preferences
- **Timezone** - Display timezone for timestamps

## Features in Detail

### Dashboard
- **Statistics Cards**: Total logs, errors, warnings, info logs
- **Recent Logs**: Latest log entries with color-coded levels
- **Real-time Updates**: Live data refresh (if WebSocket enabled)

### Log Viewer
- **Advanced Filtering**: By level, service, date range, search term
- **Export Functionality**: Download filtered logs as CSV
- **Responsive Design**: Works on desktop and mobile devices
- **Metadata View**: Expandable log details

### Analytics
- **Interactive Charts**: Built with Recharts library
- **Multiple Visualizations**: Pie charts, line charts, bar charts
- **Time Range Selection**: 1h, 24h, 7d, 30d views
- **Performance Metrics**: Response times, success rates, error rates

### Settings
- **Persistent Storage**: Settings saved to localStorage
- **API Configuration**: Backend endpoint setup
- **Display Preferences**: Refresh intervals, log levels
- **System Information**: Version, status, health checks

## Customization

### Styling
The application uses CSS modules and custom CSS. Main style files:
- `src/index.css` - Global styles
- `src/App.css` - App-level styles
- Component-specific CSS files in `src/components/`

### Adding New Features
1. Create new component in `src/components/`
2. Add route in `src/App.js`
3. Add navigation item in `src/components/Navbar.js`
4. Create corresponding API methods in `src/services/api.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Check the documentation
- Review the API integration guide

---

Built with ❤️ for modern logging systems 