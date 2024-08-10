import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);

  const NavItems: any[] = [
    {
      title: "Rank",
      path: "/ranking",
      image: "/image/ranking.png",
    },
    {
      title: "Mine",
      path: "/",
      image: "/image/mining.png",
    },
    {
      title: "Friends",
      path: "/quest",
      image: "/image/quest.png",
    },
    {
      title: "Earn",
      path: "/task",
      image: "/image/earnings.png",
    },
  ];

  return (
    <div className="flex flex-row justify-around items-center bottom-0 px-2  w-full h-[70px]  bg-[#353535] rounded-t-xl absolute z-[1000] font-mono ">
      {NavItems.map((item) => (
        <Link
          to={item.path}
          key={item.title}
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition w-[23%] rounded-md mt-1 ${
            path === item.path
              ? "scale-[110%] opacity-100 bg-[#292929]"
              : "opacity-30 text-white"
          }`}
        >
          <img src={item.image} alt={item.title} className="w-8 h-8" />
          <p className="text-sm max-sm:text-sm text-white">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
