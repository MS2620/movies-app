import '../App.css';
import React, {useEffect, useState} from "react";
import {Carousel} from "../components/Carousel";
import Navbar from "../components/Navbar";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

function Movies() {
    const setVoteClass = (vote) => {
        if(vote >= 8) {
            return "text-green-500";
        } else if(vote >= 6) {
            return "text-yellow-500";
        } else {
            return "text-red-500";
        }
    }

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        const URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODI4OTU4M2Y0ZGRhMzQ1ZDM1OWFmNDYxYmE3MjdiZiIsInN1YiI6IjY0NzRiMjA4YmUyZDQ5MDBhN2Q2ZWIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8j1VTDGhefE_3weG06581Wj23iiUDLLxYw0idy0fGHw'
            }
        };
        fetch(`${URL}${page}&sort_by=popularity.desc`, options)
            .then(response => response.json())
            .then(response =>
                setMovies(response.results)
            )
            .catch(err => console.error(err));
    }, [page]);
    return (
        <>
            <Navbar />
        <div className="bg-cyan-700">
            <Carousel />
            <div className="flex flex-wrap justify-center bg-cyan-700 mb-2">
            {/* Goes through the movies array and displays all items in the array */}
            {movies.map((movie) => (
                // Creates a div for each movie
                <div className="w-[300px] rounded-md overflow-hidden relative drop-shadow-2xl ml-9 mb-4 mt-4 group " key={movie.id}>
                    {/* Adds the movie to each associated movie */}
                    <img className="w-full object-cover" src={IMG_API + movie.poster_path} alt={movie.title} />
                    {/* Creates a div for the bottom of the card */}
                    <div className=" flex flex-row justify-between bg-cyan-600 h-20">
                        {/* Displays the movies title */}
                        <p className="font-bold text-lg mt-2 mb-2 ml-2">
                            {movie.title}
                        </p>
                        {/* Displays the movies average rating */}
                        <p className={`text-center font-bold bg-cyan-700 rounded-lg h-6 w-12 mr-2 mt-3 ${setVoteClass(movie.vote_average)}`}>
                            {movie.vote_average}
                        </p>
                    </div>
                    {/* Creates a div for the overview which starts */}
                    <div className="px-2 pb-2 bg-white absolute bottom-0 right-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out delay-150">
                        {/* Adds the text Overview: */}
                        <h2 className="font-bold text-lg">Overview: </h2>
                        {/* Adds the overview text if available if not it displays No overview available*/}
                        <p className="text-gray-700 text-base">
                            {movie.overview ? movie.overview : "No overview available"}
                        </p>
                    </div>
                </div>
            ))}
            </div>
            <div>
                <select className="bg-white rounded-lg h-6 w-24 ml-2 mr-2 mt-3" value={page} onChange={
                    e => setPage(e.target.value)
                }>
                    <option value="1">Page 1</option>
                    <option value="2">Page 2</option>
                    <option value="3">Page 3</option>
                    <option value="4">Page 4</option>
                </select>
            </div>
        </div>
        </>
    );
}

export default Movies;
