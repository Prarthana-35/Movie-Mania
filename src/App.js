import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [movieName, setMovieName] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const getMovieInfo = async (movie) => {
    try {
      const myapiKey = process.env.REACT_APP_API_KEY; // Access API key from .env
      const url = `http://www.omdbapi.com/?apikey=${myapiKey}&t=${movie}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Unable to fetch movie data');
      }

      const data = await response.json();
      setMovieData(data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('No movie found');
      setMovieData(null);
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (movieName.trim() !== '') {
      setErrorMessage('Fetching Movie data...');
      getMovieInfo(movieName);
    } else {
      setErrorMessage('Enter the movie name');
    }
  };

  return (
    <div className="App">
      <nav>
        <div className="navbar">
          <div className="logo">
            <h1>Movie App</h1>
          </div>
          <div className="search-container">
            <form onSubmit={handleFormSubmission}>
              <input
                type="text"
                placeholder="Search movie"
                className="inputBox"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <main>
        <section>
          <div className="movie-container">
            {errorMessage && <h2>{errorMessage}</h2>}
            {movieData && (
              <>
                <div className="movie-info">
                  <h2>{movieData.Title}</h2>
                  <p><strong>Rating: &#11088;</strong> {movieData.imdbRating}</p>
                  <div className="movie-genre">
                    {movieData.Genre.split(', ').map((genre, index) => (
                      <p key={index}>{genre}</p>
                    ))}
                  </div>
                  <p><strong>Released: </strong>{movieData.Released}</p>
                  <p><strong>Duration: </strong>{movieData.Runtime}</p>
                  <p><strong>Cast: </strong>{movieData.Actors}</p>
                  <p><strong>Plot: </strong>{movieData.Plot}</p>
                </div>

                <div className="movie-poster">
                  <img src={movieData.Poster} alt="Movie Poster" />
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Movie Guide App</p>
      </footer>
    </div>
  );
};

export default App;
