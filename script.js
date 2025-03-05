const form = document.querySelector("form");
const input = document.querySelector("input");
const movieContainer = document.querySelector(".movie_container");

const API_KEY = "3a24369ffe7ea83cc46f57bdca4080de";
const posterBasePath = "https://image.tmdb.org/t/p/original";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // console.log(input.value);
  const movieName = input.value;
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
  );
  const movieResult = await movieResponse.json();
  // console.log(result);
  const movies = movieResult.results;
  // console.log(movies);


  displayAllMovies(movies);

  input.value = "";
  input.focus();
});

function displayAllMovies(arr) {
  movieContainer.innerHTML = "";
  let fragment = document.createDocumentFragment();
  arr.forEach((movie,idx) => {
    console.log(movie);
    // console.log(movie.poster_path);

    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-div");

    const poster = document.createElement("img");
    poster.src = `${posterBasePath}${movie.poster_path}`;
    poster.alt = "poster image is not available at the moment";
    poster.classList.add("poster");
    // console.log(`${posterBasePath}${movie.poster_path}`);

    const title = document.createElement("p");
    title.innerText = `Title : ${movie.title}`;
    // console.log(movie.title);

    const release = document.createElement("p");
    release.innerText = `Release date : ${movie.release_date}`;
    // console.log(release.innerText);

    const rating = document.createElement("p");
    rating.innerText = `IMDB rating : ${movie.
      vote_average} `
      let star = document.createElement("span");
      star.innerHTML = `<i class="fa-solid fa-star"></i>`;
      star.style.color = "yellow";
      rating.append(star);
      // console.log(rating.innerText);

    const plot = document.createElement("p");
    plot.innerText = `Plot : ${movie.overview}`
    plot.classList.add("plot");


    movieDiv.append(poster, title, release,rating, plot);
    fragment.append(movieDiv);
  });
  movieContainer.append(fragment);
}
