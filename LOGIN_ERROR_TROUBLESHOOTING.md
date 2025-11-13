# Login 500 Error - Troubleshooting Guide

## ✅ Frontend Error Handling Improved

The frontend now shows specific error messages for different error types:

### Error Messages:
- **500 Server Error**: "Server error. Please check if the database is connected and JWT_SECRET is set in backend .env file."
- **401 Unauthorized**: "Invalid username or password."
- **Connection Refused**: "Cannot connect to server. Please make sure the backend server is running on port 5000."
- **Timeout**: "Request timeout. Please try again."

## 🔍 Common Causes of 500 Error

### 1. Missing JWT_SECRET in Backend
**Check:** `edims-backend/.env` file should have:
```
JWT_SECRET=your-secret-key-here
```

**Fix:** Add JWT_SECRET to `.env` file:
```bash
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 2. Database Not Connected
**Check:** Backend server logs should show:
```
✅ Database connection has been established successfully.
```

**Fix:** 
- Make sure MySQL is running in XAMPP
- Check database credentials in `.env`
- Verify database `edims_db` exists

### 3. Users Table Not Created
**Check:** Run the SQL script to create default users:
```sql
-- See edims-backend/insert_default_users.sql
```

**Fix:** Execute the SQL script in phpMyAdmin

### 4. Backend Server Not Running
**Check:** Backend should be running on port 5000
```bash
cd edims-backend
npm start
```

**Fix:** Start the backend server

## 🧪 Testing Steps

1. **Check Backend Server:**
   ```bash
   cd edims-backend
   npm start
   ```
   Should see: `🚀 Server is running on port 5000`

2. **Check Database Connection:**
   Backend logs should show database connected successfully

3. **Check .env File:**
   ```bash
   # edims-backend/.env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=edims_db
   JWT_SECRET=your-secret-key-here
   ```

4. **Test Login:**
   - Username: `admin`
   - Password: `1234`

## 📝 Frontend Changes Made

1. ✅ Added frontend validation (username and password required)
2. ✅ Improved error messages for different error types
3. ✅ Added timeout handling (10 seconds)
4. ✅ Better error logging in console
5. ✅ Specific message for 500 errors

## 🔧 Next Steps

If you still get 500 error:
1. Check backend server console for detailed error messages
2. Verify JWT_SECRET is set in backend `.env`
3. Check database connection
4. Verify users exist in database
5. Check backend server logs for specific error details

---

The frontend now provides clear error messages to help identify the issue!

