# Debug Login 500 Error - Step by Step

## ✅ Changes Made

### 1. Added Request Logging
- Backend now logs all incoming login requests
- Shows method, path, body, and headers
- Helps identify if request is reaching the server

### 2. Enhanced Error Logging
- Frontend shows actual error message from backend
- Backend logs detailed error information
- Console shows error type, message, and stack trace

### 3. Added Test Endpoint
- `/api/auth/test` - Simple POST endpoint to test connection
- Helps verify if the issue is with the login endpoint specifically

## 🔍 How to Debug

### Step 1: Restart Backend Server
```bash
cd edims-backend
npm start
```

### Step 2: Check Backend Console
When you try to login, you should see:
```
📥 Incoming login request:
   Method: POST
   Path: /api/auth/login
   Body: { username: 'admin', password: '1234' }
   Headers: { content-type: 'application/json', origin: 'http://localhost:3000' }
🔐 Login controller called
Request body: { username: 'admin', password: '1234' }
...
```

### Step 3: Check Frontend Console
Open browser DevTools (F12) and check Console tab. You should see:
```
Error response: { message: '...', error: '...', errorType: '...' }
Error status: 500
```

### Step 4: Check Network Tab
1. Open DevTools → Network tab
2. Try to login
3. Click on the `/api/auth/login` request
4. Check:
   - **Request URL**: Should be `http://localhost:5000/api/auth/login`
   - **Request Method**: Should be `POST`
   - **Request Payload**: Should show `{ username: 'admin', password: '1234' }`
   - **Response**: Should show the error message

## 🐛 Common Issues

### Issue 1: Request Not Reaching Server
**Symptoms**: No logs in backend console
**Fix**: 
- Check if backend is running on port 5000
- Check CORS configuration
- Verify frontend is using correct URL

### Issue 2: Request Body Empty
**Symptoms**: Backend logs show `Body: {}`
**Fix**: 
- Check Content-Type header is `application/json`
- Verify request is being sent correctly

### Issue 3: Database Error
**Symptoms**: Error shows "SequelizeConnectionError" or "Database error"
**Fix**: 
- Check MySQL is running
- Verify database connection in `.env`
- Run `node test-login.js` to test connection

### Issue 4: JWT_SECRET Error
**Symptoms**: Error shows "JWT_SECRET is not configured"
**Fix**: 
- Check `.env` file has `JWT_SECRET=...`
- Restart backend after adding JWT_SECRET

## 🧪 Test Connection

### Test 1: Simple Connection Test
```bash
# In browser console or Postman
fetch('http://localhost:5000/api/auth/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: 'data' })
})
.then(r => r.json())
.then(console.log)
```

### Test 2: Check Backend is Running
```bash
# In browser
fetch('http://localhost:5000/')
.then(r => r.json())
.then(console.log)
```

## 📝 Next Steps

1. **Restart backend server**
2. **Try to login**
3. **Check backend console** - Look for the detailed logs
4. **Check frontend console** - Look for error details
5. **Check Network tab** - Verify request/response
6. **Share the error message** from backend console

The detailed logging will now show exactly where the error occurs!

