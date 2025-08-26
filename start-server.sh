#!/bin/bash

echo "🚀 Starting Traincape Technology Server..."

# Check if server is already running
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Server is already running on port 8080"
    echo "📊 Server Status: http://localhost:8080"
    exit 0
fi

# Start the server
echo "📡 Starting server on port 8080..."
nohup node index.js > server.log 2>&1 &

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Server started successfully!"
    echo "📊 Server Status: http://localhost:8080"
    echo "📝 Logs: tail -f server.log"
else
    echo "❌ Failed to start server. Check server.log for details"
    exit 1
fi
