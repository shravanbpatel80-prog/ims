# Default Users Setup

## ✅ Default Users

Two default users need to be created in the database:

### 1. Admin User
- **Username**: `admin`
- **Password**: `1234`
- **Role**: `Admin`
- **Full Name**: Administrator
- **Access**: All pages (Dashboard, Masters, Entry, Reports)

### 2. Staff User
- **Username**: `user`
- **Password**: `123`
- **Role**: `Staff`
- **Full Name**: Staff User
- **Access**: Only Entry pages (Dashboard + Entry)

## 🔧 How to Create Default Users

### Option 1: Using SQL Script (Recommended)

1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Select your database (`edims_db`)
3. Click on the "SQL" tab
4. Copy and paste the contents of `edims-backend/insert_default_users.sql`
5. Click "Go" to execute

### Option 2: Using MySQL Command Line

```bash
mysql -u root -p edims_db < edims-backend/insert_default_users.sql
```

The SQL script will:
- Insert both users with hashed passwords
- Skip insertion if users already exist (using ON DUPLICATE KEY UPDATE)
- Show verification query to confirm users were created

## 🔐 Login Credentials

### Admin Login
```
Username: admin
Password: 1234
```

### Staff Login
```
Username: user
Password: 123
```

## 📝 Notes

- Passwords are automatically hashed using bcrypt
- Users are stored in the `Users` table
- Role is stored as ENUM('Admin', 'Staff')
- Last login timestamp is tracked automatically

---

✅ **Default users are ready to use!**

