# CareerGuide

A full-stack career guidance platform that helps students discover the right career path through smart assessments, personalized recommendations, 1:1 chat, and live video mentorship sessions.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express, Socket.io |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT |
| Real-time | Socket.io (chat + WebRTC signaling) |

## Features

- 🎯 Smart career assessment questionnaire (4 education levels)
- 📊 AI-powered career recommendations with match scores
- 💬 Real-time 1:1 chat between students and mentors
- 📹 Live video calls (WebRTC)
- 👨‍🏫 Mentor dashboard with student management
- 📈 Student dashboard with strength analysis

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### Environment Variables

**Backend** (`backend/.env`):
```
MONGO_URI=your_mongodb_atlas_uri
PORT=5000
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Deployment

- **Backend**: [Render](https://render.com) (Web Service)
- **Frontend**: [Vercel](https://vercel.com)

See the deployment guide for full setup instructions.

## License

MIT
