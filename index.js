const API_KEY = "4fc2e124";

async function fetchMovie(movieName) {
  try {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('movieContainer').innerHTML = '';

    const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`);
    const movieData = await movieResponse.json();

    if (movieData.Response === "True") {
      const movie = movieData.Search[0];

      document.getElementById('movieContainer').innerHTML = `
        <div class="movie-card">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'}" alt="Poster">
          <h2>${movie.Title} (${movie.Year})</h2>
          <button id="watchTrailerBtn" style="padding: 10px 20px; margin-top: 20px; font-size: 18px; background: #ff4d4d; color: white; border: none; border-radius: 5px; cursor: pointer; transition: background 0.3s;">
            🎬 Voir la bande-annonce
          </button>
        </div>
      `;

      document.getElementById('watchTrailerBtn').addEventListener('click', () => {
        const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}`;
        window.open(youtubeSearchUrl, '_blank');
      });

    } else {
      document.getElementById('movieContainer').innerHTML = "<p>Film non trouvé.</p>";
    }
  } catch (error) {
    console.error('Erreur:', error);
    document.getElementById('movieContainer').innerHTML = "<p>Erreur lors de la recherche du film.</p>";
  } finally {
    document.getElementById('loader').classList.add('hidden');
  }
}

document.getElementById('searchInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const searchTerm = e.target.value.trim();
    if (searchTerm) {
      fetchMovie(searchTerm);
    }
  }
});

document.getElementById('searchButton').addEventListener('click', function () {
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (searchTerm) {
    fetchMovie(searchTerm);
  }
});