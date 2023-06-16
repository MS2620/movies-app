import '../App.css';
import React, {useEffect, useState} from "react";
import {Carousel} from "../components/Carousel";
import Navbar from "../components/Navbar";
import Movie from "../components/Movies";

function Movies() {
    
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
                <>
                    <Movie key={movie.id} {...movie} />
                </>
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
