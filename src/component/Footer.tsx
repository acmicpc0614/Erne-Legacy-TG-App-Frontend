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
    <div>
      <div className="flex flex-row gap-10 justify-around items-center absolute bottom-[2px] mb-20 w-full">
        <Link
          to="/ranking"
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
            path === "/ranking"
              ? "scale-[110%] opacity-100"
              : "opacity-50 text-white"
          }`}
        >
          <img src="/image/ranking.png" alt="ranking" className="w-12 h-12" />
          <p className="text-sm max-sm:text-sm text-white">RANKING</p>
        </Link>
        <Link
          to=""
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
            path === "/" ? "scale-[110%] opacity-100" : "opacity-50 text-white"
          }`}
        >
          <img src="/image/mining.png" alt="play" className="w-12 h-12" />
          <p className="text-sm max-sm:text-sm text-white">Mint</p>
        </Link>
        <Link
          to="/quest"
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${
            path === "/quest"
              ? "scale-[110%] opacity-100"
              : "opacity-50 text-white"
          }`}
        >
          <img src="/image/add-friend.png" alt="quest" className="w-12 h-12" />
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
          <img src="/image/earnings.png" alt="ranking" className="w-12 h-12" />
          <p className="text-sm max-sm:text-sm text-white">TASK</p>
        </Link>
      </div>
    </div>
  );
}
