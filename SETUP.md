# Server Setup Guide

## Environment Variables Setup

### For Local Development

To fix the login issues locally, you need to create a `.env` file in the server directory with the following variables:

#### Required Variables

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

### For Render Deployment

When deploying to Render, you need to set environment variables through the Render dashboard:

#### Steps to Set Environment Variables on Render:

1. **Go to your Render Dashboard**
2. **Select your service** (traincape-backend-1)
3. **Go to Environment tab**
4. **Add the following environment variables:**

| Variable Name | Value | Required |
|---------------|-------|----------|
| `SECRET_KEY` | `your-super-secret-jwt-key-here-make-it-long-and-secure-123456789` | ✅ CRITICAL |
| `MongoDBURI` | `your-mongodb-connection-string` | ✅ Required |
| `EMAIL_USER` | `your-email@example.com` | ✅ Required |
| `EMAIL_PASS` | `your-email-password` | ✅ Required |
| `FRONTEND_URL` | `https://traincapetech.in` | ✅ Required |
| `PORT` | `8080` | Optional (Render sets this) |

#### How to Add Environment Variables on Render:

1. Log into your [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service
3. Go to the **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable one by one:
   - **Key**: `SECRET_KEY`
   - **Value**: `your-actual-secret-key-here`
   - Click **Save Changes**

6. **Redeploy** your service after adding all variables

### Steps to Fix Login Issues

#### For Local Development:
1. **Create .env file**: Create a `.env` file in the `server` directory
2. **Add SECRET_KEY**: This is the most critical variable for JWT token generation
3. **Set MongoDB URI**: Ensure your MongoDB connection string is correct
4. **Configure Email**: Set up email credentials for OTP functionality

#### For Render Deployment:
1. **Set environment variables** in Render dashboard
2. **Redeploy** the service
3. **Check logs** to ensure no environment variable errors

### Example .env file (Local Development Only)

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
- **For production**: Always use the hosting platform's environment variable system

### Current Issues Fixed

1. **JWT Secret Missing**: Added validation for SECRET_KEY environment variable
2. **CORS Configuration**: Enhanced CORS settings to properly handle cross-origin requests
3. **Error Handling**: Improved error messages for debugging

### Testing

#### Local Development:
After setting up the `.env` file:
1. Restart your server: `node index.js`
2. The server should start without the JWT secret error
3. Login functionality should work properly
4. CORS errors should be resolved

#### Render Deployment:
After setting environment variables in Render:
1. Redeploy your service
2. Check the deployment logs
3. Server should start without environment variable errors
4. Test login functionality from your frontend

### Troubleshooting

#### Local Development:
If you still encounter issues:
1. Check that `.env` file is in the correct location (`server/.env`)
2. Verify all environment variables are set correctly
3. Ensure no extra spaces or quotes around values
4. Check server logs for specific error messages

#### Render Deployment:
If deployment fails:
1. Check that all environment variables are set in Render dashboard
2. Verify variable names are exactly correct (case-sensitive)
3. Check deployment logs for specific errors
4. Ensure MongoDB connection string is accessible from Render's servers
5. Redeploy after making any changes to environment variables

### Quick Fix for Current Issue

**Immediate Action Required:**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your `traincape-backend-1` service
3. Go to **Environment** tab
4. Add `SECRET_KEY` with a secure value
5. Click **Save Changes**
6. **Redeploy** the service

The server will then start successfully without the SECRET_KEY error. 