# PureLearn API Smoke Tests Runner
# This script runs the comprehensive smoke tests for all API endpoints

Write-Host "🚀 Starting PureLearn API Smoke Tests..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "api.csproj")) {
    Write-Host "❌ Error: Please run this script from the api directory" -ForegroundColor Red
    exit 1
}

# Restore packages
Write-Host "📦 Restoring packages..." -ForegroundColor Yellow
dotnet restore

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
dotnet build --no-restore

# Run the smoke tests
Write-Host "🧪 Running smoke tests..." -ForegroundColor Yellow
dotnet test Tests/PureLearnApi.Tests.csproj --no-build --verbosity normal --logger "console;verbosity=detailed"

# Check if tests passed
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ All smoke tests passed!" -ForegroundColor Green
} else {
    Write-Host "❌ Some smoke tests failed!" -ForegroundColor Red
}

Write-Host "🏁 Smoke test run completed." -ForegroundColor Green 