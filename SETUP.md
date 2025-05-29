# Server Setup Guide

## Environment Variables Setup

To fix the login issues, you need to create a `.env` file in the server directory with the following variables:

### Required Variables

```env
# JWT Configuration - CRITICAL for login functionality
SECRET_KEY=your-super-secret-jwt-key-here-make-it-long-and-secure-123456789

# MongoDB Configuration
MongoDBURI=your-mongodb-connection-string

# Email Configuration (for OTP functionality)
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

# Server Configuration
PORT=8080
FRONTEND_URL=https://traincapetech.in
```

### Steps to Fix Login Issues

1. **Create .env file**: Create a `.env` file in the `server` directory
2. **Add SECRET_KEY**: This is the most critical variable for JWT token generation
3. **Set MongoDB URI**: Ensure your MongoDB connection string is correct
4. **Configure Email**: Set up email credentials for OTP functionality

### Example .env file

```env
SECRET_KEY=my-super-secret-jwt-key-for-traincape-technology-2024-secure
MongoDBURI=mongodb+srv://username:password@cluster.mongodb.net/traincape
EMAIL_USER=noreply@traincapetech.in
EMAIL_PASS=your-email-app-password
PORT=8080
FRONTEND_URL=https://traincapetech.in
```

### Security Notes

- Keep your `.env` file secure and never commit it to version control
- Use a strong, unique SECRET_KEY (at least 32 characters)
- Use app-specific passwords for email authentication
- Ensure MongoDB connection string includes proper authentication

### Current Issues Fixed

1. **JWT Secret Missing**: Added validation for SECRET_KEY environment variable
2. **CORS Configuration**: Enhanced CORS settings to properly handle cross-origin requests
3. **Error Handling**: Improved error messages for debugging

### Testing

After setting up the `.env` file:

1. Restart your server: `node index.js`
2. The server should start without the JWT secret error
3. Login functionality should work properly
4. CORS errors should be resolved

### Troubleshooting

If you still encounter issues:

1. Check that `.env` file is in the correct location (`server/.env`)
2. Verify all environment variables are set correctly
3. Ensure no extra spaces or quotes around values
4. Check server logs for specific error messages 