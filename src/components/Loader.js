import React from "react";
import Skeleton from "@mui/material/Skeleton";

const Loader = () => {
  return (
    <div className="flex flex-wrap justify-center bg-gradient-to-r from-emerald-400 to-cyan-400">
      {Array(10)
        .fill()
        .map((item, index) => (
          <div className="w-[300px] rounded-md overflow-hidden relative shadow-2xl m-4">
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              width={300}
              height={494}
            />
          </div>
        ))}
    </div>
  );
};

export default Loader;
