# Quick Setup for XAMPP Users

## What You Need to Know

**Sequelize** = A tool that helps your Node.js backend talk to MySQL. It will:
- ✅ Create all tables automatically (once the database exists)
- ❌ **CANNOT** create the database itself - you must do this first!

## Quick Steps (3 minutes)

### 1. Start XAMPP
- Open XAMPP Control Panel
- Click **Start** for **MySQL** (make sure it turns green)

### 2. Create the Database

**Easiest way - Using phpMyAdmin:**
1. Open browser: `http://localhost/phpmyadmin`
2. Click **"New"** button (left sidebar)
3. Database name: `edims_db`
4. Click **"Create"**
5. Done! ✅

**Or using SQL:**
- Open phpMyAdmin → SQL tab
- Paste: `CREATE DATABASE edims_db;`
- Click "Go"

### 3. Your .env File is Already Set!

Your `edims-backend/.env` file is already configured for XAMPP:
```
DB_HOST=localhost
DB_NAME=edims_db
DB_USER=root
DB_PASSWORD=          ← Empty (XAMPP default)
```

### 4. Start Backend

```bash
cd edims-backend
npm start
```

**What happens:**
- Sequelize connects to `edims_db` database
- Sequelize **automatically creates all tables** (Items, Vendors, Departments, etc.)
- You'll see: ✅ Database connection established
- You'll see: 🔄 All models synchronized

### 5. Start Frontend (in new terminal)

```bash
cd client
npm start
```

## That's It! 🎉

Your app should now work. The backend will automatically create all the tables it needs.

## Common Issues

**"Unknown database 'edims_db'"**
→ You forgot to create the database! Follow Step 2 above.

**"Access denied for user 'root'@'localhost'"**
→ Check if MySQL is running in XAMPP. If you set a password, update `DB_PASSWORD` in `.env`.

**"Can't connect to MySQL server"**
→ Make sure MySQL is started in XAMPP Control Panel.

---

📖 **Need more details?** See `XAMPP_SETUP.md` for complete instructions.

