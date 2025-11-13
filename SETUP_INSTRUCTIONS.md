# Setup Instructions for EDIMS Application

## Prerequisites
- Node.js and npm installed
- MySQL database server running
- MySQL database created (or create one named `edims_db`)

## Backend Setup (edims-backend)

1. **Navigate to the backend directory:**
   ```bash
   cd edims-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the `edims-backend` directory:**
   Create a file named `.env` with the following content:
   ```
   DB_HOST=localhost
   DB_NAME=edims_db
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here
   
   PORT=5000
   
   CLIENT_URL=http://localhost:3000
   
   JWT_SECRET=your-secret-key-change-this-in-production
   ```
   
   **Important:** Replace `your_mysql_password_here` with your actual MySQL root password. If you don't have a password set, leave it empty: `DB_PASSWORD=`

4. **Create the MySQL database (if not already created):**
   ```sql
   CREATE DATABASE IF NOT EXISTS edims_db;
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
   
   The server should start on port 5000. You should see:
   - ✅ Database connection has been established successfully.
   - 🔄 All models were synchronized successfully.
   - 🚀 Server is running on port 5000

## Frontend Setup (client)

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the `client` directory:**
   Create a file named `.env` with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
   
   **Note:** If your backend runs on a different port, update the URL accordingly.

4. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The app should open in your browser at `http://localhost:3000`

## Troubleshooting

### Database Connection Error
If you see "Access denied for user" error:
- Check that your MySQL server is running
- Verify the database credentials in `.env` file
- Make sure the database exists: `CREATE DATABASE edims_db;`
- If MySQL has no password, set `DB_PASSWORD=` (empty)

### CORS Errors
If you see CORS errors in the browser console:
- Make sure the backend server is running on port 5000
- Verify `REACT_APP_API_URL` in client `.env` matches the backend URL
- Check that `CLIENT_URL` in backend `.env` matches the frontend URL (default: http://localhost:3000)

### API Not Fetching Data
- Ensure both servers are running (backend on 5000, frontend on 3000)
- Check browser console for errors
- Verify the `.env` files are in the correct directories
- Restart both servers after creating/updating `.env` files

## Running Both Servers

You'll need to run both servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd edims-backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd client
npm start
```

## API Endpoints

The backend provides the following API endpoints:
- `/api/auth` - Authentication
- `/api/vendors` - Vendor management
- `/api/items` - Item management
- `/api/departments` - Department management
- `/api/purchase-orders` - Purchase order management
- `/api/challans` - Challan management
- `/api/bills` - Bill management
- `/api/stock-issues` - Stock issue management
- `/api/reports` - Reports

All endpoints are prefixed with the base URL: `http://localhost:5000`

