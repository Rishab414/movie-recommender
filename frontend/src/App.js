import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleRecommend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations('');

    try {
      const response = await fetch(`${API_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data.movies);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 Movie Recommender</h1>
        <p>Get personalized movie recommendations powered by AI</p>
      </header>
      
      <div className="container">
        <form onSubmit={handleRecommend}>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Tell me what kind of movies you like... (e.g., 'I love sci-fi movies with great cinematography' or 'Show me funny comedies')"
            rows="4"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Getting recommendations...' : 'Get Recommendations'}
          </button>
        </form>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {recommendations && (
          <div className="recommendations">
            <h2>Recommended Movies:</h2>
            <div className="movies-content">
              {recommendations.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
