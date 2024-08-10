import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);
  return (
    <div className="flex flex-row gap-10 justify-around items-center bottom-0  w-full h-[70px] pt-[10px] px-5 bg-[#292929] rounded-xl absolute z-[1000]">
      <Link
        to="/ranking"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
          path === "/ranking"
            ? "scale-[110%] opacity-100"
            : "opacity-50 text-white"
        }`}
      >
        <img src="/image/ranking.png" alt="ranking" className="w-8 h-8" />
        <p className="text-sm max-sm:text-sm text-white">Rank</p>
      </Link>
      <Link
        to=""
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
          path === "/" ? "scale-[110%] opacity-100" : "opacity-50 text-white"
        }`}
      >
        <img src="/image/mining.png" alt="play" className="w-8 h-8" />
        <p className="text-sm max-sm:text-sm text-white">Mine</p>
      </Link>
      <Link
        to="/quest"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
          path === "/quest"
            ? "scale-[110%] opacity-100"
            : "opacity-50 text-white"
        }`}
      >
        <img src="/image/add-friend.png" alt="quest" className="w-8 h-8" />
        <p className="text-sm max-sm:text-sm text-white">Friends</p>
      </Link>
      <Link
        to="/task"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
          path === "/task"
            ? "scale-[110%] opacity-100"
            : "opacity-50 text-white"
        }`}
      >
        <img src="/image/earnings.png" alt="ranking" className="w-8 h-8" />
        <p className="text-sm max-sm:text-sm text-white">Earn</p>
      </Link>
    </div>
  );
}
