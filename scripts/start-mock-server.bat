@echo off
REM Start Prism mock server for Portal API
REM Usage: scripts\start-mock-server.bat

echo Starting Portal API Mock Server...
echo =================================
echo.

REM Check if Prism is installed
where prism >nul 2>nul
if %errorlevel% neq 0 (
    echo Prism is not installed. Installing...
    npm install -g @stoplight/prism-cli
)

REM Start the mock server
echo Starting mock server on http://localhost:4010
echo Press Ctrl+C to stop the server
echo.

prism mock openapi\openapi.yaml --port 4010 --host 0.0.0.0

echo Mock server stopped.