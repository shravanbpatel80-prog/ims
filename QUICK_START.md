# Quick Start Guide

## ✅ Setup Complete!

The following has been configured:

1. **Backend .env file** - Created/updated in `edims-backend/.env`
2. **Frontend .env file** - Created in `client/.env`
3. **CORS configuration** - Updated to allow frontend requests
4. **Database connection** - Improved error handling

## 🚀 Starting the Application

### Step 1: Ensure MySQL is Running
Make sure your MySQL server is running and the database exists:
```sql
CREATE DATABASE IF NOT EXISTS edims_db;
```

### Step 2: Start the Backend Server
Open a terminal and run:
```bash
cd edims-backend
npm start
```

You should see:
- ✅ Database connection has been established successfully.
- 🔄 All models were synchronized successfully.
- 🚀 Server is running on port 5000

### Step 3: Start the Frontend Server
Open a **new terminal** and run:
```bash
cd client
npm start
```

The React app will open in your browser at `http://localhost:3000`

## 🔧 Troubleshooting

### Database Connection Error
If you see "Access denied for user" error:
- Check that MySQL server is running
- Verify the database `edims_db` exists
- If your MySQL has a password, update `DB_PASSWORD` in `edims-backend/.env`
- If no password, make sure `DB_PASSWORD=` (empty) in the .env file

### CORS Errors
- Make sure backend is running on port 5000
- Make sure frontend is running on port 3000
- Verify `REACT_APP_API_URL=http://localhost:5000` in `client/.env`
- Restart both servers after any .env changes

### API Not Fetching Data
- Check browser console (F12) for errors
- Verify both servers are running
- Check network tab to see if API calls are being made
- Ensure the API endpoints are correct (they should start with `/api/`)

## 📝 Current Configuration

**Backend:**
- Port: 5000
- Database: edims_db
- User: root
- Password: (empty - update if needed)

**Frontend:**
- Port: 3000
- API URL: http://localhost:5000

## 🎯 Next Steps

1. Start both servers
2. Test the application by navigating to different pages:
   - Item Master
   - Vendor Master
   - Department Master
   - Purchase Entry

All pages should now be able to fetch data from the backend API!

