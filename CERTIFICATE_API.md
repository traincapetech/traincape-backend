# Certificate API Documentation

## Overview
The Certificate API allows you to create and manage certificates with proper date handling.

## Date Format Support
The API now supports multiple date formats for the `issueDate` field:

### Supported Input Formats:
1. **DD/MM/YYYY** (e.g., "31/03/2026")
2. **DD-MM-YYYY** (e.g., "31-03-2026")
3. **ISO Date String** (e.g., "2026-03-31")
4. **JavaScript Date Object**

### Backend Processing:
- The server automatically converts DD/MM/YYYY format to proper Date objects
- All dates are stored as MongoDB Date objects
- Validation ensures only valid dates are accepted

## API Endpoints

### POST /certificates
Create a new certificate.

**Required Fields:**
- `certificateId` (String, unique)
- `fullName` (String)
- `courseName` (String)
- `issueDate` (String/Date) - Supports DD/MM/YYYY format
- `issuedBy` (String)

**Optional Fields:**
- `certificateURL` (String) - URL to certificate file

**Example Request:**
```json
{
  "certificateId": "CERT-2024-001",
  "fullName": "John Doe",
  "courseName": "Advanced JavaScript",
  "issueDate": "31/03/2026",
  "issuedBy": "TrainCape Technology",
  "certificateURL": "https://example.com/cert.pdf"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Certificate added successfully",
  "data": {
    "_id": "...",
    "certificateId": "CERT-2024-001",
    "fullName": "John Doe",
    "courseName": "Advanced JavaScript",
    "issueDate": "2026-03-31T00:00:00.000Z",
    "issuedBy": "TrainCape Technology",
    "certificateURL": "https://example.com/cert.pdf",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /certificates/:id
Fetch a certificate by its certificateId.

**Example Request:**
```
GET /certificates/CERT-2024-001
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "certificateId": "CERT-2024-001",
    "fullName": "John Doe",
    "courseName": "Advanced JavaScript",
    "issueDate": "2026-03-31T00:00:00.000Z",
    "issuedBy": "TrainCape Technology",
    "certificateURL": "https://example.com/cert.pdf",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /certificates
Fetch all certificates (admin only).

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "certificateId": "CERT-2024-001",
      "fullName": "John Doe",
      "courseName": "Advanced JavaScript",
      "issueDate": "2026-03-31T00:00:00.000Z",
      "issuedBy": "TrainCape Technology",
      "certificateURL": "https://example.com/cert.pdf",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Error Handling

### Common Error Responses:

**400 Bad Request - Invalid Date Format:**
```json
{
  "success": false,
  "message": "Invalid date format: 32/13/2026. Expected DD/MM/YYYY or valid date string."
}
```

**400 Bad Request - Missing Required Field:**
```json
{
  "success": false,
  "message": "Missing required field: certificateId"
}
```

**400 Bad Request - Duplicate Certificate ID:**
```json
{
  "success": false,
  "message": "Certificate ID already exists. Please use a unique certificate ID."
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Certificate not found"
}
```

## Frontend Integration

### Using the CertificateForm Component:
The frontend form now uses:
- HTML5 date input for better UX
- Automatic date format conversion
- Proper error handling and loading states
- Form validation

### Date Input Handling:
- Frontend uses HTML5 `<input type="date">` for better UX
- Automatically converts YYYY-MM-DD to DD/MM/YYYY for backend
- Backend handles the conversion to proper Date objects

## Testing

### Test the API:
```bash
# Create a certificate
curl -X POST http://localhost:8080/certificates \
  -H "Content-Type: application/json" \
  -d '{
    "certificateId": "TEST-001",
    "fullName": "Test User",
    "courseName": "Test Course",
    "issueDate": "15/01/2024",
    "issuedBy": "Test Organization"
  }'

# Fetch the certificate
curl http://localhost:8080/certificates/TEST-001
```

## Troubleshooting

### Common Issues:

1. **Date Format Error**: Ensure dates are in DD/MM/YYYY format
2. **Duplicate Certificate ID**: Use unique certificate IDs
3. **Missing Fields**: All required fields must be provided
4. **Invalid Date**: Ensure the date is valid (e.g., not 32/13/2026)

### Debug Logs:
The server logs detailed information about date conversion:
- Input date format
- Conversion process
- Final Date object
- Any errors during conversion 