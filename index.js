const API_KEY = "4fc2e124";

async function fetchMovie(movieName) {
  try {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('movieContainer').innerHTML = '';

    const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`);
    const movieData = await movieResponse.json();
    console.log(movieData);

    if (movieData.Response === "True") {
      movieData.Search.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'}" alt="Poster">
          <h2>${movie.Title} (${movie.Year})</h2>
          <button style="padding: 10px 20px; margin-top: 10px; font-size: 16px; background: #ff4d4d; color: white; border: none; border-radius: 5px; cursor: pointer;">
            🎬 Voir la bande-annonce
          </button>
        `;

        movieCard.querySelector('button').addEventListener('click', () => {
          const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}`;
          window.open(youtubeSearchUrl, '_blank');
        });

        document.getElementById('movieContainer').appendChild(movieCard);
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
