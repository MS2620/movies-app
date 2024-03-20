import "../App.css";
import React, { useEffect, useState } from "react";
import { Carousel } from "../components/Carousel";
import Navbar from "../components/Navbar";
import Movie from "../components/Movies";
import Loader from "../components/Loader";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const URL =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODI4OTU4M2Y0ZGRhMzQ1ZDM1OWFmNDYxYmE3MjdiZiIsInN1YiI6IjY0NzRiMjA4YmUyZDQ5MDBhN2Q2ZWIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8j1VTDGhefE_3weG06581Wj23iiUDLLxYw0idy0fGHw",
      },
    };
    fetch(`${URL}${page}&sort_by=popularity.desc`, options)
      .then((response) => response.json())
      .then((response) =>
        setTimeout(() => {
          console.log(response.results);
          setMovies(response.results);
        }, 3000)
      )
      .catch((err) => console.error(err));
  }, [page]);

  const ChangePage = (page) => {
    movies.length = 0;
    setPage(page);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-emerald-400 to-cyan-400">
        <Carousel />
        <div className="flex flex-wrap justify-center">
          {/* If no movies, display the loader */}
          {movies.length === 0 && <Loader />}
          {/* Goes through the movies array and displays all items in the array */}
          {movies &&
            movies.map((movie) => (
              <>
                <Movie key={movie.id} {...movie} />
              </>
            ))}
        </div>
        <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 w-full flex justify-end pr-40 lg:pr-32 pb-4">
          <div className="">
            <select
              className="rounded-lg h-6 w-24 ml-2 mr-2 mt-3"
              value={page}
              onChange={(e) => ChangePage(parseInt(e.target.value))}
            >
              <option value={1}>Page 1</option>
              <option value={2}>Page 2</option>
              <option value={3}>Page 3</option>
              <option value={4}>Page 4</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movies;
