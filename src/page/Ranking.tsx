import RankingList from "../component/RankingList";
import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../store";
import { getAllUsers } from "../store/reducers/wallet";
export default function Ranking() {
  const users_state = useSelector((state) => state?.wallet?.users);
  const [usersa, setUsers] = useState(users_state);
  // useEffect(() => {
  //   dispatch(getAllUsers()).then(() => {
  //     setUsers(usersa);
  //   });
  // }, [users_state]);
  useEffect(() => {
    console.log("getallusers calling...");
    dispatch(getAllUsers()).then(() => {
      setUsers(usersa);
    });
    console.log(usersa.length);
  }, []);

  const findUserRank = (username: string) => {
    for (let i = 0; i < usersa.length; i++)
      if (usersa[i].username === username) return i + 1;
  };

  const findUserGDP = (username: string) => {
    for (let i = 0; i < usersa.length; i++)
      if (usersa[i].username === username) return usersa[i].totalPoint;
  };

  return (
    <div className="Ranking max-w-full mx-auto text-white mb-16 !h-full">
      <div className="flex  w-full items-ceter gap-2 justify-start sticky top-0 z-10 bg-black opacity-75 pt-8">
        <div className="text-xl text-start w-[20%] font-sans text-[#8a8888] font-bold flex justify-center items-center">
          {findUserRank("telegram")}th
        </div>
        <div className="relative overflow-hidden h-10 w-[30%] flex items-center justify-start gap-2 ">
          <img
            src="/image/Bitmap3.png"
            alt="avatar"
            className="w-8 h-8 rounded-xl"
          />
          <p className="text-md text-start font-sans overflow-hidden text-[#8a8888] font-bold">
            telegram
          </p>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/image/dollar.png"
            alt="avatar"
            className="w-6 h-6 rounded-xl"
          />
          <p className="text-xl text-end pr-4 w-[50%] font-sans text-[#8a8888] font-bold">
            {findUserGDP("telegram")}
          </p>
        </div>
      </div>

      <div className="flex px-3 py-1 text-white text-lg font-bold justify-start align-middle overflow-y-hidden sticky top-[72px] z-10 opacity-75 shadow-lg shadow-white mb-3">
        <div className="text-start w-[20%] flex justify-center text-sm">
          Rank
        </div>
        <div className="text-start w-[40%] flex justify-center text-sm">
          User
        </div>
        <div className="text-start w-[60%] flex justify-end pr-4 text-sm">
          Total Score
        </div>
      </div>

      <RankingList usersa={usersa} />
    </div>
  );
}
