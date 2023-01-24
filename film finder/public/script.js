const tmdbKey = 'a345f6b66df4c55d3c23beb050703f1c';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  let genreRequestEndpoint = "/genre/movie/list";
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = tmdbBaseUrl+genreRequestEndpoint+requestParams;
  try{
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let genres = jsonResponse['genres'];
      return genres
    }
  }catch(err){
    console.log(err);
  }
};

const getMovies = async() => {
  const selectedGenre = getSelectedGenre();
  let discoverMovieEndpoint = '/discover/movie';
  let requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  let urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok){
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let movies = jsonResponse['results'];
      console.log(movies);
      return movies;
    }
  } catch(err) {
    console.log(err);
  }
};

const getMovieInfo = async(movie) => {
  let movieId = movie['id'];
  let movieEndpoint = `/movie/${movieId}`;
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = tmdbBaseUrl+movieEndpoint+requestParams;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok){
      let movieInfo = await response.json();
      return movieInfo
    }
  } catch(err) {
    console.log(err);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  let movies = await getMovies();
  let randomMovie = getRandomMovie(movies);
  let info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;