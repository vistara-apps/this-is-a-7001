# BioCraft AI API Documentation

## Overview

BioCraft AI provides a comprehensive API for generating AI-powered LinkedIn bio content and keyword optimization. This documentation covers all available endpoints, authentication, and integration patterns.

## Base URL

```
Production: https://biocraft-ai.com/api
Development: http://localhost:3000/api
```

## Authentication

All API requests require authentication using API keys or session tokens.

### API Key Authentication

```http
Authorization: Bearer YOUR_API_KEY
```

### Session Authentication

```http
Cookie: session=YOUR_SESSION_TOKEN
```

## Endpoints

### 1. Bio Generation

#### Generate Bio Drafts

Generate multiple LinkedIn bio variations based on user input.

**Endpoint:** `POST /api/bio/generate`

**Request Body:**
```json
{
  "jobTitle": "Senior Software Engineer",
  "industry": "Technology",
  "experience": "5+ years",
  "skills": "React, Node.js, Python, AWS",
  "goals": "Seeking new opportunities in AI/ML",
  "tone": "professional"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bioDrafts": [
      "Senior Software Engineer passionate about Technology with 5+ years experience...",
      "Experienced Senior Software Engineer in Technology | React, Node.js Expert...",
      "Senior Software Engineer specializing in Technology. 5+ years track record..."
    ],
    "generatedAt": "2024-01-15T10:30:00Z",
    "usageCount": 1
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "USAGE_LIMIT_EXCEEDED",
    "message": "Free tier limit reached (3 bio generations per day)",
    "details": {
      "currentUsage": 3,
      "limit": 3,
      "resetTime": "2024-01-16T00:00:00Z"
    }
  }
}
```

### 2. Keyword Optimization

#### Generate Keywords

Analyze a bio and suggest relevant keywords for better LinkedIn discoverability.

**Endpoint:** `POST /api/keywords/generate`

**Request Body:**
```json
{
  "bioText": "Senior Software Engineer passionate about Technology...",
  "industry": "Technology",
  "jobTitle": "Senior Software Engineer"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "keywords": [
      "Leadership",
      "Strategy",
      "Innovation",
      "Growth",
      "Digital Transformation",
      "Team Building",
      "Analytics",
      "Customer Success",
      "Business Development",
      "Optimization"
    ],
    "relevanceScore": 0.92,
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 3. User Management

#### Get User Profile

Retrieve user profile information and subscription status.

**Endpoint:** `GET /api/user/profile`

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "email": "user@example.com",
    "subscriptionStatus": "premium",
    "usageCount": 15,
    "usageLimit": null,
    "createdAt": "2024-01-01T00:00:00Z",
    "lastResetDate": "2024-01-15T00:00:00Z"
  }
}
```

#### Update User Profile

Update user profile information.

**Endpoint:** `PUT /api/user/profile`

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "preferences": {
    "defaultTone": "professional",
    "emailNotifications": true
  }
}
```

### 4. Subscription Management

#### Create Checkout Session

Create a Stripe checkout session for premium subscription.

**Endpoint:** `POST /api/subscription/checkout`

**Request Body:**
```json
{
  "priceId": "price_premium_monthly",
  "customerEmail": "user@example.com",
  "successUrl": "https://biocraft-ai.com/success",
  "cancelUrl": "https://biocraft-ai.com/cancel"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "cs_test_session_id",
    "url": "https://checkout.stripe.com/pay/cs_test_session_id"
  }
}
```

#### Handle Webhook

Process Stripe webhook events for subscription updates.

**Endpoint:** `POST /api/subscription/webhook`

**Headers:**
```
Stripe-Signature: webhook_signature
```

### 5. Analytics

#### Get Usage Statistics

Retrieve usage statistics for the current user.

**Endpoint:** `GET /api/analytics/usage`

**Query Parameters:**
- `period`: `day`, `week`, `month`, `year`
- `startDate`: ISO date string
- `endDate`: ISO date string

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "bioGenerations": 45,
    "keywordAnalyses": 23,
    "totalUsage": 68,
    "breakdown": [
      {
        "date": "2024-01-01",
        "bioGenerations": 3,
        "keywordAnalyses": 1
      }
    ]
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Request body or parameters are invalid |
| `UNAUTHORIZED` | Authentication required or invalid |
| `FORBIDDEN` | Insufficient permissions |
| `USAGE_LIMIT_EXCEEDED` | Free tier usage limit reached |
| `SUBSCRIPTION_REQUIRED` | Premium subscription required |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `INTERNAL_ERROR` | Server error |
| `SERVICE_UNAVAILABLE` | External service (OpenAI/Stripe) unavailable |

## Rate Limits

### Free Tier
- Bio Generation: 3 requests per day
- Keyword Analysis: Requires premium subscription
- API Requests: 100 requests per hour

### Premium Tier
- Bio Generation: Unlimited
- Keyword Analysis: Unlimited
- API Requests: 1000 requests per hour

## SDKs and Libraries

### JavaScript/Node.js

```bash
npm install @biocraft-ai/sdk
```

```javascript
import BioCraftAI from '@biocraft-ai/sdk';

const client = new BioCraftAI({
  apiKey: 'your-api-key',
  baseURL: 'https://biocraft-ai.com/api'
});

// Generate bio drafts
const result = await client.bio.generate({
  jobTitle: 'Software Engineer',
  industry: 'Technology',
  experience: '3 years',
  skills: 'React, Node.js',
  goals: 'Career growth',
  tone: 'professional'
});
```

### Python

```bash
pip install biocraft-ai
```

```python
from biocraft_ai import BioCraftAI

client = BioCraftAI(api_key='your-api-key')

# Generate bio drafts
result = client.bio.generate(
    job_title='Software Engineer',
    industry='Technology',
    experience='3 years',
    skills='React, Node.js',
    goals='Career growth',
    tone='professional'
)
```

## Webhooks

### Subscription Events

BioCraft AI sends webhook events for subscription changes:

```json
{
  "event": "subscription.updated",
  "data": {
    "userId": "user_123",
    "subscriptionStatus": "premium",
    "planId": "premium_monthly",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Usage Events

```json
{
  "event": "usage.limit_reached",
  "data": {
    "userId": "user_123",
    "usageType": "bio_generation",
    "currentUsage": 3,
    "limit": 3,
    "resetTime": "2024-01-16T00:00:00Z"
  }
}
```

## Best Practices

### 1. Error Handling

Always implement proper error handling:

```javascript
try {
  const result = await client.bio.generate(userInput);
  // Handle success
} catch (error) {
  if (error.code === 'USAGE_LIMIT_EXCEEDED') {
    // Show upgrade prompt
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Implement retry with backoff
  } else {
    // Handle other errors
  }
}
```

### 2. Caching

Cache responses when appropriate to reduce API calls:

```javascript
const cacheKey = `bio_${JSON.stringify(userInput)}`;
const cached = cache.get(cacheKey);

if (cached) {
  return cached;
}

const result = await client.bio.generate(userInput);
cache.set(cacheKey, result, { ttl: 3600 }); // Cache for 1 hour
```

### 3. Rate Limiting

Implement client-side rate limiting:

```javascript
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter(10, 'minute'); // 10 requests per minute

await limiter.removeTokens(1);
const result = await client.bio.generate(userInput);
```

## Support

For API support and questions:

- Email: api-support@biocraft-ai.com
- Documentation: https://docs.biocraft-ai.com
- Status Page: https://status.biocraft-ai.com
- GitHub Issues: https://github.com/biocraft-ai/api-issues

## Changelog

### v1.2.0 (2024-01-15)
- Added keyword optimization endpoint
- Improved error handling and response format
- Added usage analytics endpoint

### v1.1.0 (2024-01-01)
- Added subscription management endpoints
- Implemented webhook support
- Enhanced rate limiting

### v1.0.0 (2023-12-01)
- Initial API release
- Bio generation endpoint
- User management endpoints
