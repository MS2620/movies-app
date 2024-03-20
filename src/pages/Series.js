import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Serie from "../components/Series";

function Series() {
    const [topSeries, setTopSeries] = useState([]);

    React.useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODI4OTU4M2Y0ZGRhMzQ1ZDM1OWFmNDYxYmE3MjdiZiIsInN1YiI6IjY0NzRiMjA4YmUyZDQ5MDBhN2Q2ZWIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8j1VTDGhefE_3weG06581Wj23iiUDLLxYw0idy0fGHw'
            }
        };

        fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => (
                console.log(response.results),
                setTopSeries(response.results)))
            .catch(err => console.error(err));
    }, []);
    return (
        <div className="bg-gradient-to-r from-emerald-400 to-cyan-400">
            <Navbar />
            <p className="font-semibold text-4xl text-gray-300 pl-8 pb-2 inline-block">Series</p>
            {/* <div className="flex flex-row flex-grow overflow-x-scroll bg-cyan-700 mb-2"> */}
            <div className="flex flex-wrap justify-center bg-gradient-to-r from-emerald-400 to-cyan-400">
                {topSeries.map((series) => (
                    <>
                    <Serie key={series.id} {...series} />
                    </>
                ))}
            </div>
        </div>
    )
}

export default Series;