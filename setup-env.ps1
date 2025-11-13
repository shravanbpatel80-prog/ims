# PowerShell script to create .env files for EDIMS application
# Run this script from the project root directory

Write-Host "=== EDIMS Environment Setup ===" -ForegroundColor Cyan
Write-Host ""

# Backend .env file
$backendEnvPath = "edims-backend\.env"
if (Test-Path $backendEnvPath) {
    Write-Host "⚠️  Backend .env file already exists at: $backendEnvPath" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Skipping backend .env file creation." -ForegroundColor Yellow
    } else {
        $createBackend = $true
    }
} else {
    $createBackend = $true
}

if ($createBackend) {
    Write-Host ""
    Write-Host "Creating backend .env file..." -ForegroundColor Green
    Write-Host "Please provide the following information:" -ForegroundColor Cyan
    
    $dbHost = Read-Host "Database Host (default: localhost)"
    if ([string]::IsNullOrWhiteSpace($dbHost)) { $dbHost = "localhost" }
    
    $dbName = Read-Host "Database Name (default: edims_db)"
    if ([string]::IsNullOrWhiteSpace($dbName)) { $dbName = "edims_db" }
    
    $dbUser = Read-Host "Database User (default: root)"
    if ([string]::IsNullOrWhiteSpace($dbUser)) { $dbUser = "root" }
    
    $dbPassword = Read-Host "Database Password (press Enter if no password)" -AsSecureString
    $dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
    )
    
    $port = Read-Host "Backend Port (default: 5000)"
    if ([string]::IsNullOrWhiteSpace($port)) { $port = "5000" }
    
    $clientUrl = Read-Host "Client URL (default: http://localhost:3000)"
    if ([string]::IsNullOrWhiteSpace($clientUrl)) { $clientUrl = "http://localhost:3000" }
    
    $jwtSecret = Read-Host "JWT Secret (default: your-secret-key-change-this-in-production)"
    if ([string]::IsNullOrWhiteSpace($jwtSecret)) { $jwtSecret = "your-secret-key-change-this-in-production" }
    
    $backendEnvContent = @"
# Database Configuration
DB_HOST=$dbHost
DB_NAME=$dbName
DB_USER=$dbUser
DB_PASSWORD=$dbPasswordPlain

# Server Configuration
PORT=$port

# Client URL (for CORS)
CLIENT_URL=$clientUrl

# JWT Secret (for authentication)
JWT_SECRET=$jwtSecret
"@
    
    $backendEnvContent | Out-File -FilePath $backendEnvPath -Encoding utf8
    Write-Host "✅ Backend .env file created at: $backendEnvPath" -ForegroundColor Green
}

# Frontend .env file
$frontendEnvPath = "client\.env"
if (Test-Path $frontendEnvPath) {
    Write-Host ""
    Write-Host "⚠️  Frontend .env file already exists at: $frontendEnvPath" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Skipping frontend .env file creation." -ForegroundColor Yellow
    } else {
        $createFrontend = $true
    }
} else {
    $createFrontend = $true
}

if ($createFrontend) {
    Write-Host ""
    Write-Host "Creating frontend .env file..." -ForegroundColor Green
    
    $apiUrl = Read-Host "Backend API URL (default: http://localhost:5000)"
    if ([string]::IsNullOrWhiteSpace($apiUrl)) { $apiUrl = "http://localhost:5000" }
    
    $frontendEnvContent = "REACT_APP_API_URL=$apiUrl"
    
    $frontendEnvContent | Out-File -FilePath $frontendEnvPath -Encoding utf8
    Write-Host "✅ Frontend .env file created at: $frontendEnvPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Make sure MySQL is running and the database exists" -ForegroundColor White
Write-Host "2. Start the backend server: cd edims-backend && npm start" -ForegroundColor White
Write-Host "3. Start the frontend server: cd client && npm start" -ForegroundColor White
Write-Host ""

