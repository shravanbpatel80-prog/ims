# Forgot Password Implementation

## ✅ Features Implemented

### Backend
1. **User Model Updates**
   - Added `email` field (unique, optional)
   - Added `reset_token` field (for password reset tokens)
   - Added `reset_token_expiry` field (1 hour expiration)
   - Added hooks to hash passwords on create and update

2. **Email Service**
   - SMTP email sending using nodemailer
   - HTML email template with reset link
   - Uses environment variables for SMTP configuration

3. **API Endpoints**
   - `POST /api/auth/forgot-password` - Request password reset
   - `POST /api/auth/reset-password` - Reset password with token

4. **Security Features**
   - Secure token generation using crypto
   - Token expiration (1 hour)
   - Password validation (min 6 characters)
   - Doesn't reveal if user exists (security best practice)

### Frontend
1. **Forgot Password Page** (`/forgot-password`)
   - Enter username or email
   - Sends reset link via email

2. **Reset Password Page** (`/reset-password`)
   - Enter new password
   - Confirm password
   - Validates token from email link

3. **Login Page Update**
   - Added "Forgot password?" link

## 🔧 Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd edims-backend
npm install nodemailer
```

#### Update .env File
Add these SMTP settings to `edims-backend/.env`:
```env
SMTP_PASS=vrpxmtoxmwvweldv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=shravan.b.patel954@gmail.com
SMTP_FROM="EDIMS<shravan.b.patel954@gmail.com>"
```

#### Update Database
1. The User model will automatically add the new fields when you restart the server
2. Run the SQL script to add emails to existing users:
   ```sql
   -- See edims-backend/update_users_with_email.sql
   ```

### 2. Database Migration

Run this SQL in phpMyAdmin to add emails to existing users:
```sql
-- Update admin user
UPDATE Users 
SET email = 'shravan.b.patel954@gmail.com' 
WHERE username = 'admin';

-- Update staff user (change email as needed)
UPDATE Users 
SET email = 'staff@example.com' 
WHERE username = 'user';
```

### 3. Frontend Setup

No additional setup needed. The routes are already added to `App.js`.

## 📋 How It Works

### Forgot Password Flow

1. **User clicks "Forgot password?" on login page**
2. **User enters username or email** on forgot password page
3. **Backend finds user** by username or email
4. **Backend generates secure token** (32 bytes, hex)
5. **Backend saves token** with 1-hour expiration
6. **Backend sends email** with reset link
7. **User clicks link** in email
8. **User enters new password** on reset page
9. **Backend validates token** and expiration
10. **Backend hashes and saves** new password
11. **User can login** with new password

### Security Features

- ✅ Tokens expire after 1 hour
- ✅ Tokens are single-use (cleared after use)
- ✅ Secure random token generation
- ✅ Password hashing with bcrypt
- ✅ Doesn't reveal if user exists
- ✅ Email validation

## 🧪 Testing

### Test Forgot Password

1. Go to `/forgot-password`
2. Enter username: `admin` or email
3. Check email for reset link
4. Click link to go to reset page
5. Enter new password
6. Login with new password

### Test Reset Password

1. Use the reset link from email
2. Enter new password (min 6 characters)
3. Confirm password
4. Should redirect to login
5. Login with new password

## 📝 API Endpoints

### POST /api/auth/forgot-password
**Request:**
```json
{
  "usernameOrEmail": "admin"
}
```

**Response:**
```json
{
  "message": "If an account with that username or email exists, a password reset link has been sent."
}
```

### POST /api/auth/reset-password
**Request:**
```json
{
  "token": "abc123...",
  "email": "user@example.com",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password has been reset successfully. You can now login with your new password."
}
```

## ⚠️ Important Notes

1. **Email Setup**: Make sure SMTP credentials are correct in `.env`
2. **User Emails**: Users must have email addresses set in database
3. **Token Expiry**: Reset tokens expire after 1 hour
4. **Password Length**: Minimum 6 characters required
5. **Email Delivery**: Check spam folder if email doesn't arrive

## 🔐 Security Considerations

- Tokens are cryptographically secure (32 bytes random)
- Tokens expire after 1 hour
- Tokens are single-use
- Passwords are hashed with bcrypt
- Email addresses are validated
- Doesn't reveal user existence (security best practice)

---

✅ **Forgot password feature is fully implemented and ready to use!**

