import React from "react";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "text-green-500";
  } else if (vote >= 6) {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
};
const Movie = ({ id, title, poster_path, overview, vote_average }) => (
  <div className="card group" key={id}>
    <div>
      <img
        className="w-full object-cover"
        src={IMG_API + poster_path}
        alt={title}
        height={450}
      />
    </div>
    <div className=" flex flex-row justify-between">
      <p className="font-bold text-lg mt-2 mb-2 ml-2">{title}</p>
      <p
        className={`text-center font-bold bg-teal-900 rounded-lg h-6 w-12 mr-2 mt-3 ${setVoteClass(
          vote_average
        )}`}
      >
        {vote_average}
      </p>
    </div>
    <div className="px-2 pb-2 bg-white absolute bottom-0 right-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out delay-150 hover:overflow-auto hover:max-h-full">
      <h2 className="font-bold text-lg">Overview: </h2>
      <p className="text-gray-700 text-base">{overview}</p>
    </div>
  </div>
);

export default Movie;
