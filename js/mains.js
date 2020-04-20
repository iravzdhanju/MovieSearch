$(document).ready(() => {
    $("#searchForm").on('keyup', (e) => {
      e.preventDefault();
      let searchText = $("#searchText").val();
      getMovies(searchText);
    });
  });
  
  function getMovies(searchText){
    //make request to api using axios
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" + searchText)
      .then(function (response) {
        let movies = response.data.results;
        let output = '';
        $.each(movies, (index, movie) => {
          output+=`
            <div class="column-movies">
              <div class="columns-movie-list">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <h5 class="titles">${movie.title}</h5>
                <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#"><h5 class="details">Movie Details</a>
              </div>
            </div>
          `;
        });
        $('#movies').html(output);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
  }
  
  function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817")
      .then(function (response) {
      let movie = response.data;
      //console.log(movie);
      let output = `
          <div class="row">
            <div class="box">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
        
              <h2 class="title">${movie.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
                <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
                <li class="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>
              </ul>
            </div>
          </div>
         
      `;
      $('#movie').html(output);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


var colors = ['#760CE8', '#4782B1', '#E8890C','#EF6C00','#764ba2'];

var changeBackground = function() {
  document.body.style.background = colors[Math.floor(Math.random()*colors.length)];
};

changeBackground();