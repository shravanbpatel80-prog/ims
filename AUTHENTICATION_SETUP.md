# Authentication Setup - JWT with Cookies

## ✅ What Was Implemented

### 1. **Axios Configuration** (`client/src/utils/axiosConfig.js`)
   - Created centralized axios instance
   - Automatically reads JWT token from cookie
   - Adds `Authorization: Bearer <token>` header to all requests
   - Handles 401 errors (token expiration)
   - Uses `withCredentials: true` for cookie support

### 2. **Login Page** (`client/src/pages/Login.js`)
   - ✅ Fixed to use correct endpoint: `/api/auth/login`
   - ✅ Changed from `email` to `username` (matches backend)
   - ✅ Stores JWT token in HTTP cookie (using js-cookie)
   - ✅ Cookie settings:
     - Expires: 15 minutes (matches backend token expiry)
     - Secure: HTTPS only in production
     - SameSite: Strict (CSRF protection)
   - ✅ Stores user info in sessionStorage for quick access

### 3. **All Master Pages Updated**
   - ✅ **Item Master**: Edit & Delete buttons working
   - ✅ **Vendor Master**: Edit & Delete buttons working
   - ✅ **Department Master**: Edit & Delete buttons working
   - ✅ All use authenticated `api` instance instead of plain `axios`
   - ✅ All API calls automatically include JWT token from cookie

## 🔐 Security Features

1. **Token Storage**: JWT stored in HTTP cookie (not localStorage)
2. **Automatic Token Injection**: All API requests automatically include token
3. **Token Expiration**: Handles 401 errors gracefully
4. **Cookie Security**: Secure and SameSite flags set

## 📋 How It Works

1. **User Logs In:**
   - Frontend sends: `{ username, password }` to `/api/auth/login`
   - Backend returns: `{ token, user }`
   - Frontend stores token in cookie: `authToken`

2. **Making API Calls:**
   - Frontend uses `api` from `utils/axiosConfig.js`
   - Interceptor reads token from cookie
   - Adds `Authorization: Bearer <token>` header
   - Backend validates token and processes request

3. **Edit/Delete Operations:**
   - All use authenticated `api` instance
   - Token automatically included
   - Backend validates token before allowing operation

## 🎯 API Endpoints Now Working

### Item Master
- ✅ `GET /api/items` - List items
- ✅ `POST /api/items` - Create item
- ✅ `PUT /api/items/:id` - Update item (requires auth)
- ✅ `DELETE /api/items/:id` - Delete item (requires auth)

### Vendor Master
- ✅ `GET /api/vendors` - List vendors
- ✅ `POST /api/vendors` - Create vendor
- ✅ `PUT /api/vendors/:id` - Update vendor (requires auth)
- ✅ `DELETE /api/vendors/:id` - Delete vendor (requires auth)

### Department Master
- ✅ `GET /api/departments` - List departments
- ✅ `POST /api/departments` - Create department
- ✅ `PUT /api/departments/:id` - Update department (requires auth)
- ✅ `DELETE /api/departments/:id` - Delete department (requires auth)

## 🚀 Usage

1. **Login First:**
   - Go to login page
   - Enter username and password
   - Token will be stored in cookie automatically

2. **Use Master Pages:**
   - All operations (view, add, edit, delete) work
   - Token automatically included in requests
   - No need to manually handle tokens

3. **Edit/Delete:**
   - Click Edit button → Opens modal with existing data
   - Click Delete button → Confirms and deletes
   - Both require valid JWT token

## 📝 Notes

- **Backend unchanged**: All backend logic remains as-is
- **Cookie-based**: Token stored in cookie, not localStorage
- **Automatic**: No manual token handling needed in components
- **Secure**: Cookie has security flags set

## 🔧 Dependencies Added

- `js-cookie`: For cookie management (already installed)

---

✅ **All edit and delete buttons are now connected and working with JWT authentication!**

