# 🚀 Traincape Server Management Guide

## Quick Start

### Start Server
```bash
./start-server.sh
```

### Check Server Status
```bash
./keep-alive.sh status
```

### View Logs
```bash
./keep-alive.sh logs
```

## Server Management Scripts

### 1. `start-server.sh` - Simple Start
- Starts the server if not already running
- Shows server status
- Displays log file location

### 2. `stop-server.sh` - Simple Stop
- Stops the server gracefully
- Confirms server is stopped

### 3. `keep-alive.sh` - Advanced Management
- **Start**: `./keep-alive.sh start`
- **Stop**: `./keep-alive.sh stop`
- **Restart**: `./keep-alive.sh restart`
- **Status**: `./keep-alive.sh status`
- **Monitor**: `./keep-alive.sh monitor` (auto-restart)
- **Logs**: `./keep-alive.sh logs`

## Common Issues & Solutions

### Issue: Server Not Responding
```bash
# Check if server is running
./keep-alive.sh status

# If down, restart
./keep-alive.sh restart

# Check logs for errors
./keep-alive.sh logs
```

### Issue: Port Already in Use
```bash
# Stop server
./stop-server.sh

# Wait a moment
sleep 2

# Start server
./start-server.sh
```

### Issue: Questions Not Loading
```bash
# Test API endpoint
curl http://localhost:8080

# Test questions endpoint
curl "http://localhost:8080/questions/getQuestions?course=PECB&subTopic=PECBComputerForensics&level=easy"
```

## Monitoring

### Auto-Monitoring (Recommended)
```bash
# Start monitoring (auto-restarts if server goes down)
./keep-alive.sh monitor
```

### Manual Monitoring
```bash
# Check status every 30 seconds
watch -n 30 './keep-alive.sh status'
```

## Logs

### View Real-time Logs
```bash
tail -f server.log
```

### View Recent Logs
```bash
tail -n 50 server.log
```

### Search Logs
```bash
grep "ERROR" server.log
grep "Server is running" server.log
```

## Environment Variables

Make sure your `.env` file has:
```env
PORT=8080
SECRET_KEY=your-secret-key
MongoDBURI=your-mongodb-connection
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
```

## Troubleshooting

### Server Won't Start
1. Check if port 8080 is free: `lsof -i :8080`
2. Check environment variables: `cat .env`
3. Check Node.js version: `node --version`
4. Check dependencies: `npm install`

### Questions Not Loading
1. Check server status: `./keep-alive.sh status`
2. Test API: `curl http://localhost:8080`
3. Check MongoDB connection
4. View server logs: `./keep-alive.sh logs`

### Performance Issues
1. Check server logs for errors
2. Monitor memory usage: `ps aux | grep node`
3. Check MongoDB performance
4. Consider restarting server

## Production Deployment

### Using PM2 (Recommended)
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start index.js --name "traincape-server"

# Monitor
pm2 monit

# View logs
pm2 logs traincape-server
```

### Using Docker
```bash
# Build image
docker build -t traincape-server .

# Run container
docker run -p 8080:8080 --env-file .env traincape-server
```

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `./start-server.sh` | Start server |
| `./stop-server.sh` | Stop server |
| `./keep-alive.sh status` | Check status |
| `./keep-alive.sh restart` | Restart server |
| `./keep-alive.sh monitor` | Auto-monitor |
| `./keep-alive.sh logs` | View logs |
| `curl http://localhost:8080` | Test API |

## Emergency Procedures

### Server Completely Down
```bash
# 1. Stop any existing processes
pkill -f "node index.js"

# 2. Clear port
lsof -ti:8080 | xargs kill -9

# 3. Restart server
./start-server.sh

# 4. Verify
curl http://localhost:8080
```

### Database Issues
```bash
# Check MongoDB connection
node -e "require('./db.js').connectDB()"

# Check environment variables
echo $MongoDBURI
```

---

**Remember**: Always check server status before testing the frontend!
