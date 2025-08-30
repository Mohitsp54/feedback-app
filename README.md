# Feedback Hub

A MERN stack application for collecting and managing user feedback with voting, filtering, and categorization capabilities.

## Overview

Built to streamline feedback collection and prioritization for product teams. The application allows users to submit feedback with categories (Bug, Feature, Improvement), vote on submissions, and filter/search through feedback items.

**Architecture:** Traditional 3-tier MERN stack with React frontend, Express.js REST API, and MongoDB for persistence. Frontend communicates with backend via REST endpoints for CRUD operations.

## Tech Stack & Rationale

**Frontend:**
- **React 19** - Component-based UI for maintainable, reusable interface elements
- **Axios** - Promise-based HTTP client for clean API integration
- **React Toastify** - User feedback notifications without heavy UI libraries

**Backend:**
- **Express.js** - Minimal, fast web framework for REST API development
- **MongoDB + Mongoose** - Document database ideal for flexible feedback schema
- **Joi** - Schema validation to ensure data integrity

## Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Environment Variables

**Backend (.env):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
```

**Frontend (.env.local):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend:**
   ```bash
   npm install
   npm start
   ```

Application runs at `http://localhost:3000`

## API Endpoints

### GET /api/feedback
Retrieve feedback items with optional filtering

**Query Parameters:**
- `category` - Filter by Bug/Feature/Improvement
- `q` - Search by title

**Response:**
```json
[
  {
    "_id": "66a1234567890abcdef12345",
    "title": "Login button not working",
    "description": "The login button becomes unresponsive after clicking",
    "category": "Bug",
    "votes": 5,
    "createdAt": "2024-07-25T10:30:00.000Z"
  }
]
```

### POST /api/feedback
Create new feedback

**Request Body:**
```json
{
  "title": "Add dark mode",
  "description": "Users want a dark theme option",
  "category": "Feature"
}
```

### PUT /api/feedback/:id/vote
Increment vote count for feedback item

### DELETE /api/feedback/:id
Remove feedback item

## Trade-offs & Future Improvements

**Current Limitations:**
- No user authentication (anyone can vote/delete)
- Single vote per user not enforced
- No feedback status tracking (open/in-progress/closed)
- Basic search (title only)

**Next Iterations:**
1. **User Authentication** - JWT-based auth to track votes and ownership
2. **Real-time Updates** - WebSocket integration for live vote counts
3. **Advanced Search** - Full-text search across title and description
4. **Admin Dashboard** - Feedback management and analytics
5. **Status Workflow** - Track feedback lifecycle from submission to resolution
6. **API Rate Limiting** - Prevent spam and abuse
