#!/bin/bash

# Start Prism mock server for Portal API
# Usage: ./scripts/start-mock-server.sh

echo "Starting Portal API Mock Server..."
echo "================================="
echo ""

# Check if Prism is installed
if ! command -v prism &> /dev/null; then
    echo "Prism is not installed. Installing..."
    npm install -g @stoplight/prism-cli
fi

# Start the mock server
echo "Starting mock server on http://localhost:4010"
echo "Press Ctrl+C to stop the server"
echo ""

prism mock openapi/openapi.yaml --port 4010 --host 0.0.0.0

echo "Mock server stopped."