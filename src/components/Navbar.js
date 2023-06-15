import {AiOutlineSearch} from "react-icons/ai";
import {Link} from "react-router-dom";
import React, {useState} from "react";

function Navbar () {

    const [searchTerm, setSearchTerm] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const search = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODI4OTU4M2Y0ZGRhMzQ1ZDM1OWFmNDYxYmE3MjdiZiIsInN1YiI6IjY0NzRiMjA4YmUyZDQ5MDBhN2Q2ZWIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8j1VTDGhefE_3weG06581Wj23iiUDLLxYw0idy0fGHw'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => 
                {if(response.results.media_type === "person") {
                    console.log("person")
                } else {
                    console.log(response.results);
                    setSearchResults(response.results);
                }}
            )
            .catch(err => console.error(err));
    }

    return (
        <nav
            className="flex items-center justify-between flex-wrap bg-cyan-800 py-4 lg:px-12 drop-shadow-xl border-solid border-t-2 border-slate-500">
            <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
                <Link to="/" className="flex items-center flex-shrink-0 text-gray-400 mr-16">
                    <span className="font-semibold text-gray-300 text-xl tracking-tight">Home</span>
                </Link>
                <div className="block lg:hidden ">
                    <button
                        id="nav"
                        className="flex items-center px-3 py-2 border-2 rounded text-gray-400 border-gray-500 hover:text-gray-400 hover:border-gray-950">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
                <div className="text-md font-semibold text-gray-300 lg:flex-grow">
                    <Link to="/upcoming"
                       className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-cyan-600 mr-2">
                        Upcoming Releases
                    </Link>
                    <Link to="/movies"
                       className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-cyan-600 mr-2">
                        Movies
                    </Link>
                    <Link to="/series"
                       className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-cyan-600 mr-2">
                        Series
                    </Link>
                </div>
                <div className="relative mx-auto text-cyan-600 lg:block hidden">
                    <input
                        className="border-2 border-cyan-800 bg-gray-300 h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search" 
                        onKeyPress={(event) => {
                            if(event.key === "Enter") {
                                search();
                            }
                        }}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                            }}>
                    </input>
                    <button type="submit" onClick={
                        () => {
                            search();
                        }
                    } className="absolute right-0 top-0 mt-3 mr-2">
                        <AiOutlineSearch />
                    </button>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;