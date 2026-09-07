# Jira Request Portal

A web-based request management system that allows users to submit website-related requests and automatically creates Jira tickets for tracking.

## Features

- Create Jira tickets directly from a web form
- Automatic Jira issue creation using Jira REST API
- Request type selection (New Page, Content Update, Bug Fix, Other)
- Priority selection
- Go-live date tracking
- Email validation
- Direct Jira ticket link generation
- Clean and responsive UI

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- Axios

### Integration
- Jira REST API

## Project Structure

```
jira-request-portal/
│
├── src/
│   ├── App.jsx
│   └── App.css
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (local only)
│
└── README.md
```

## Installation

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
node server.js
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
JIRA_EMAIL=your-email
JIRA_API_TOKEN=your-api-token
```

## Workflow

1. User submits request form.
2. Backend receives request.
3. Jira API creates a new ticket.
4. Ticket ID and Jira link are returned.
5. User can track the request directly in Jira.

## Author

Kashish Mittal
