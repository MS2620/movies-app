import React, { useState } from "react";

export function Carousel() {
  const [topMovies, setTopMovies] = useState([]);

  const IMG_API = "https://image.tmdb.org/t/p/w1280";

  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "text-green-400";
    } else if (vote >= 6) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODI4OTU4M2Y0ZGRhMzQ1ZDM1OWFmNDYxYmE3MjdiZiIsInN1YiI6IjY0NzRiMjA4YmUyZDQ5MDBhN2Q2ZWIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8j1VTDGhefE_3weG06581Wj23iiUDLLxYw0idy0fGHw",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setTopMovies(response.results))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <p className="font-semibold text-4xl text-gray-300 ml-8 mb-2 inline-block">
        Top Rated Movies
      </p>
      <div className="flex flex-row">
        <div className="flex flex-row flex-grow overflow-x-scroll  mb-2">
          {topMovies.map((movie) => (
            <div className="carousel_card group" key={movie.id}>
              <img
                className="w-full object-cover min-h-[450px] hover:blur transition-all ease-in-out delay-150"
                src={IMG_API + movie.poster_path}
                alt={movie.title}
              />
              <div className=" flex flex-col">
                <div className="flex flex-row justify-between">
                  <p className="font-bold text-md mt-2 mb-2 ml-2">
                    {movie.title}
                  </p>
                  <p
                    className={`text-center font-bold bg-cyan-700 rounded-lg h-6 w-12 mr-2 mt-3 ${setVoteClass(
                      movie.vote_average
                    )}`}
                  >
                    {movie.vote_average}
                  </p>
                </div>
                <p className="ml-2 -mt-1">
                  Release Date:{" "}
                  <span className="text-sm">{movie.release_date}</span>
                </p>
              </div>
              <div className="px-2 pb-2 bg-gradient-to-r from-slate-500 to-slate-800 absolute bottom-0 right-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out delay-150 hover:overflow-auto hover:max-h-full">
                <h2 className="font-bold text-lg text-white">Overview: </h2>
                <p className="text-white text-base">
                  {movie.overview ? movie.overview : "No overview available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
