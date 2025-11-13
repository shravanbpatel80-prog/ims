# Testing API Connection for Item Master

## Steps to Debug

1. **Check Backend is Running:**
   - Open browser: `http://localhost:5000`
   - Should see: `{"message":"Welcome to the EDIMS backend API!"}`

2. **Test Items Endpoint:**
   - Open browser: `http://localhost:5000/api/items`
   - Should see: `[]` (empty array) or list of items

3. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Try adding an item
   - Look for error messages

4. **Check Network Tab:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Try adding an item
   - Look for the POST request to `/api/items`
   - Click on it to see:
     - Request URL
     - Request payload
     - Response status
     - Response data

## Common Issues

### Issue 1: "Cannot connect to backend server"
**Solution:**
- Make sure backend is running: `cd edims-backend && npm start`
- Check if port 5000 is available
- Verify `.env` file has correct settings

### Issue 2: "CORS error"
**Solution:**
- Backend CORS is already configured
- Make sure frontend is running on port 3000
- Check `CLIENT_URL` in backend `.env`

### Issue 3: "404 Not Found"
**Solution:**
- Check route is registered in `app.js`
- Verify route path matches: `/api/items`
- Check backend console for route registration

### Issue 4: "500 Server Error"
**Solution:**
- Check backend console for error details
- Verify database connection
- Check if database `edims_db` exists
- Verify tables are created (Sequelize sync)

### Issue 5: "400 Bad Request"
**Solution:**
- Check request payload format
- Verify required fields are sent
- Check validation errors in response

## Debugging Commands

**Test backend directly:**
```bash
# Test GET endpoint
curl http://localhost:5000/api/items

# Test POST endpoint
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"item_name":"Test Item","size":"M","color":"Blue"}'
```

**Check backend logs:**
- Look at terminal where backend is running
- Should see: "Received item data: ..."
- Should see: "Item created successfully: ..."

## Expected Behavior

1. **Frontend sends:**
   ```json
   {
     "item_name": "Test Item",
     "size": "M",
     "color": "Blue"
   }
   ```

2. **Backend receives and creates item**

3. **Backend responds:**
   ```json
   {
     "item_number": 1,
     "item_id": 1,
     "item_name": "Test Item",
     "size": "M",
     "color": "Blue",
     "current_stock": 0
   }
   ```

4. **Frontend refreshes list and shows success message**

