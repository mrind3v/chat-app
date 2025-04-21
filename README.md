# ChatApp

ChatApp is a real-time chat application. It allows users to sign up, log in, and engage in real-time conversations with other users. The app also supports profile updates, image attachments in messages, and online/offline status indicators.

## Features

- **Authentication**: Secure signup, login, and logout functionality using JWT and cookies.
- **Real-Time Messaging**: Send and receive messages in real-time using Socket.IO.
- **Profile Management**: Update profile picture and view account details.
- **Responsive Design**: Fully responsive UI built with TailwindCSS and DaisyUI.
- **Image Attachments**: Send images along with text messages.
- **Online Status**: See which users are online.
- **Skeleton Loaders**: Smooth loading experience with skeleton components.

## Screenshots

### Chat Interface
![Chat Interface](/frontend/public/chatInterface.png)

### Profile Update Screen
![Profile Update Screen](/frontend/public/profile.png)

### Signup Page
![Signup Page](/frontend/public/signup.png)

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Zustand**: For state management.
- **React Router**: For routing.
- **TailwindCSS**: For styling.
- **DaisyUI**: For pre-designed UI components.
- **Socket.IO Client**: For real-time communication.
- **Axios**: For making HTTP requests.

### Backend
- **Node.js**: For server-side logic.
- **Express**: For building RESTful APIs.
- **MongoDB**: For database storage.
- **Mongoose**: For object modeling and database interaction.
- **Socket.IO**: For real-time communication.
- **Cloudinary**: For image storage and management.
- **JWT**: For secure authentication.
- **bcryptjs**: For password hashing.

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Create a new user.
- `POST /api/auth/login`: Log in an existing user.
- `POST /api/auth/logout`: Log out the user.
- `PUT /api/auth/update-profile`: Update user profile picture.
- `GET /api/auth/check`: Check if the user is authenticated.

### Messaging
- `GET /api/messages/users`: Get a list of users for the sidebar.
- `GET /api/messages/:id`: Get messages between the logged-in user and another user.
- `POST /api/messages/send/:id`: Send a message to another user.

## Installation and Setup

### Prerequisites
Before getting started, make sure you have the following installed:
- Node.js (v16 or higher)
- MongoDB
- Git
- Cloudinary account

### Clone the Repository
```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5001
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## Available Scripts

### Backend
```bash
npm run dev    # Start development server
npm start      # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Environment Variables

### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your-super-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```


