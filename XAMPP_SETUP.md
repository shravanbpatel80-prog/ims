# XAMPP Setup Guide for EDIMS

## What is Sequelize?
**Sequelize** is a Node.js library that helps your backend communicate with MySQL. It:
- Manages database connections
- Creates and manages tables automatically
- Provides an easy way to query data
- **BUT** it does NOT create the database itself - you need to create the database first!

## Step 1: Start XAMPP

1. Open **XAMPP Control Panel**
2. Start **Apache** (if needed for phpMyAdmin)
3. Start **MySQL** - Make sure it's running (green status)

## Step 2: Create the Database

You have **two options** to create the database:

### Option A: Using phpMyAdmin (Easiest)

1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click on **"New"** in the left sidebar (or click "Databases" tab)
3. In the "Database name" field, enter: `edims_db`
4. Choose **"utf8mb4_general_ci"** as the collation (or leave default)
5. Click **"Create"** button
6. Done! ✅

### Option B: Using MySQL Command Line

1. Open **Command Prompt** or **PowerShell**
2. Navigate to XAMPP MySQL directory:
   ```bash
   cd C:\xampp\mysql\bin
   ```
3. Connect to MySQL:
   ```bash
   mysql.exe -u root
   ```
   (If you have a password, use: `mysql.exe -u root -p`)
4. Create the database:
   ```sql
   CREATE DATABASE edims_db;
   ```
5. Verify it was created:
   ```sql
   SHOW DATABASES;
   ```
6. Exit MySQL:
   ```sql
   EXIT;
   ```

## Step 3: Verify Your .env File

Make sure your `edims-backend/.env` file has these settings (XAMPP default):

```
DB_HOST=localhost
DB_NAME=edims_db
DB_USER=root
DB_PASSWORD=
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-secret-key-change-this-in-production
```

**Important for XAMPP:**
- `DB_USER=root` (default XAMPP user)
- `DB_PASSWORD=` (empty - XAMPP root user usually has no password by default)
- `DB_HOST=localhost` (or `127.0.0.1`)

If you set a password for MySQL root user in XAMPP, update `DB_PASSWORD` accordingly.

## Step 4: Test the Connection

After creating the database, start your backend:

```bash
cd edims-backend
npm start
```

You should see:
- ✅ Database connection has been established successfully.
- 🔄 All models were synchronized successfully.
- 🚀 Server is running on port 5000

**What happens:**
- Sequelize will **automatically create all the tables** in your `edims_db` database
- You don't need to create tables manually - Sequelize does it based on your models!

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
- Check if MySQL is running in XAMPP
- Verify `DB_USER` and `DB_PASSWORD` in `.env` file
- If you set a password, make sure it's correct

### Error: "Unknown database 'edims_db'"
- The database doesn't exist yet - follow Step 2 above to create it

### Error: "Can't connect to MySQL server"
- Make sure MySQL is started in XAMPP Control Panel
- Check if MySQL port (usually 3306) is not blocked
- Try `DB_HOST=127.0.0.1` instead of `localhost`

## Quick Checklist

- [ ] XAMPP MySQL is running
- [ ] Database `edims_db` is created
- [ ] `.env` file exists in `edims-backend` folder
- [ ] `.env` file has correct database credentials
- [ ] Backend server starts without errors

Once all these are done, your backend will be ready! 🚀

