# JWT Authentication Setup for Job Seekers

## Setup Required

1. **Environment Variables**: Create a `.env` file in the backend root directory with:
   ```
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   server_port=5000
   ```

2. **JWT Secret**: Replace `your_super_secret_jwt_key_here_change_in_production` with a strong, random string.

## How It Works

### 1. Login Process
- Job seeker sends credentials to `/jobseekerLogin`
- Server validates credentials and returns JWT token
- Token contains: `{ id, email, role: "jobseeker" }`
- Token expires in 24 hours

### 2. Protected Routes
The following routes now require JWT authentication:
- `POST /jobSeekerProfile` - Create profile
- `GET /getProfile/:seekerId` - Get profile
- `DELETE /deleteSeeker/:seeker_id` - Delete profile
- `PUT /updateSeeker` - Update basic info
- `PUT /updateJobSeekerProfile` - Update detailed profile
- `POST /jobSeekerApply` - Apply for jobs
- `GET /trackApplication/:seeker_id` - Track applications

### 3. Frontend Usage

#### Login and Store Token
```javascript
// After successful login
const response = await fetch('/jobseekerLogin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ jobUser, jobPass })
});

const data = await response.json();
if (data.success) {
  // Store token in localStorage or secure storage
  localStorage.setItem('jobseeker_token', data.token);
  // Store user info
  localStorage.setItem('jobseeker_user', JSON.stringify(data.user));
}
```

#### Making Authenticated Requests
```javascript
// Get token from storage
const token = localStorage.getItem('jobseeker_token');

// Include in request headers
const response = await fetch('/getProfile/123', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

#### Check Authentication Status
```javascript
const isAuthenticated = () => {
  const token = localStorage.getItem('jobseeker_token');
  if (!token) return false;
  
  try {
    // Basic token validation (frontend)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
```

## Security Features

1. **Role-based Access**: Only users with `role: "jobseeker"` can access protected routes
2. **Token Expiration**: Tokens expire after 24 hours
3. **Secure Headers**: Tokens must be sent in `Authorization: Bearer <token>` header
4. **Error Handling**: Proper error messages for unauthorized access

## Middleware Details

The `jobseekerAuth` middleware:
- Extracts token from Authorization header
- Verifies JWT signature
- Checks user role
- Adds user info to `req.user`
- Returns appropriate error responses for invalid/missing tokens 