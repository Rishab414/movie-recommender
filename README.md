# Movie Recommender 🎬

A full-stack web application that provides personalized movie recommendations based on user preferences.

## Features

✨ **Intelligent Recommendations** - Get movie suggestions based on your preferences
- Action movies with fight scenes
- Comedy films
- Drama movies
- Sci-Fi epics
- Horror films
- Romance movies

💾 **Data Persistence** - All recommendations are saved to SQLite database
🚀 **Fast & Responsive** - Built with React and Fastify
🎨 **Beautiful UI** - Modern gradient design with smooth interactions
🔄 **Real-time Feedback** - Loading states and error handling

## Tech Stack

### Backend
- **Fastify** - Fast and low overhead web framework
- **Node.js** - JavaScript runtime
- **SQLite3** - Lightweight database

### Frontend
- **React** - UI library
- **React Scripts** - Build tools
- **CSS3** - Styling with gradients

## Project Structure

```
movie-recommender/
├── backend/
│   ├── server.js          # Fastify server with API endpoints
│   ├── db.js              # SQLite database configuration
│   ├── package.json       # Backend dependencies
│   ├── package-lock.json
│   ├── node_modules/
│   └── movies.db          # SQLite database file
└── frontend/
    ├── public/
    │   └── index.html     # HTML entry point
    ├── src/
    │   ├── App.js         # Main React component
    │   ├── App.css        # Component styles
    │   ├── index.js       # React DOM render
    │   └── index.css      # Global styles
    ├── package.json       # Frontend dependencies
    ├── package-lock.json
    └── node_modules/
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <your-github-repo-url>
cd movie-recommender
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
cd ..
```

3. **Install Frontend Dependencies**
```bash
cd frontend
npm install
cd ..
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`

### Start Frontend Server (in a new terminal)
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Type in what kind of movies you like (e.g., "action movies with fight scenes")
3. Click "Get Recommendations"
4. View the personalized movie suggestions
5. Your request is automatically saved to the database

## API Endpoints

### POST /recommend
- **Description**: Get movie recommendations based on user input
- **Request Body**: `{ "userInput": "string describing movie preferences" }`
- **Response**: `{ "movies": "formatted list of recommendations" }`

Example:
```bash
curl -X POST http://localhost:5000/recommend \
  -H "Content-Type: application/json" \
  -d '{"userInput":"action movies with fight scenes"}'
```

## Database

The application uses SQLite with the following schema:

**recommendations table:**
```sql
- id (INTEGER, PRIMARY KEY)
- user_input (TEXT)
- recommended_movies (TEXT)
- timestamp (DATETIME)
```

All user inputs and generated recommendations are stored automatically.

## Features Breakdown

### Smart Genre Matching
The recommendation engine analyzes user input keywords and matches them to genres:
- "action", "fight" → Action movies
- "comedy", "funny" → Comedy films
- "drama", "emotional" → Drama movies
- "sci-fi", "space" → Science Fiction
- "horror", "scary" → Horror films
- "romance", "love" → Romance movies

### Movie Database
The application includes a curated database of popular movies across all genres, with detailed descriptions and ratings.

## Future Enhancements

- Integration with real movie APIs (TMDB, OMDB)
- User accounts and personalized recommendations
- Movie ratings and reviews
- Advanced filtering options
- Movie trailers and links

## License

MIT License - Feel free to use this project for learning and development purposes.

## Author

Created as a Full Stack Development project

## Support

For issues or suggestions, please create an issue in the GitHub repository.

---

**Happy movie watching!** 🍿🎬
