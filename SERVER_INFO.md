# HaritKranti Server Information

## ✅ Servers Running Successfully!

### Frontend Server
- **URL**: http://localhost:5173/
- **Status**: Running
- **Framework**: Vite + React
- **Command**: `npm run dev` (in root directory)

### Backend Server
- **URL**: http://localhost:5000/
- **Status**: Running
- **Framework**: Express.js
- **Command**: `npm run dev` (in backend directory)

### Database
- **MongoDB Status**: Running
- **Connection URL**: mongodb://localhost:27017/haritkranti
- **Database Name**: haritkranti

## Environment Configuration

The backend is configured with the following settings (`.env` file):

```
MONGODB_URI=mongodb://localhost:27017/haritkranti
PORT=5000
JWT_SECRET=haritkranti_super_secret_jwt_key_minimum_32_characters_long_for_security
FRONTEND_URL=http://localhost:5173
JWT_EXPIRE=7d
```

## Access the Application

1. **Frontend**: Open your browser and navigate to http://localhost:5173/
2. **Backend API**: The API is accessible at http://localhost:5000/

## API Endpoints

For detailed API documentation, check:
- `backend/API_ENDPOINTS.md`
- `backend/API_ENDPOINTS_SIMPLE.md`
- `backend/POSTMAN_GUIDE.md`

## Stopping the Servers

To stop the servers, you can:
1. Use Kiro's process management to stop the background processes
2. Or press `Ctrl+C` in the terminal windows

## Notes

- MongoDB is running as a Windows service
- Both frontend and backend are running in development mode with hot-reload enabled
- Make sure MongoDB service is running before starting the backend server
