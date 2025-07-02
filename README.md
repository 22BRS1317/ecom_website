# E-commerce Website

A full-stack e-commerce website built with MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features
- User authentication and authorization
- Product catalog with categories
- Shopping cart functionality
- Order management
- Responsive design

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Styling: CSS, Tailwind CSS

## Project Structure
```
├── frontend/          # React frontend
├── backend/           # Node.js backend
└── README.md
```

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file with required environment variables
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
PORT=4000
JWT_SECRET=your_jwt_secret
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.