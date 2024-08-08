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
    // console.log("getallusers calling...");
    dispatch(getAllUsers()).then(() => {
      setUsers(usersa);
    });
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
    <div className="Ranking max-w-full mx-auto text-white !h-full">
      <div className="flex flex-col w-full items-ceter gap-2 justify-start z-10 px-3 pt-2">
        <div className="overflow-hidden h-10  flex items-center justify-start gap-2 ">
          <img
            src="/image/Bitmap3.png"
            alt="avatar"
            className="w-8 h-8 rounded-xl"
          />
          <p className="text-xl text-start font-sans overflow-hidden text-[#eeeeee] font-bold">
            telegram
          </p>
        </div>
        <div className="flex">
          <div className="text-xl text-start w-[20%] font-sans text-[#8a8888] font-bold flex items-center">
            {findUserRank("telegram")}th
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
      </div>

      <div className="flex px-3 py-1 text-white text-lg font-bold justify-start align-middle overflow-y-hidden mb-1 border-b-blue-200 border-b-[1px] rounded-lg">
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

      <RankingList usersa={usersa} username={"telegram"} />
    </div>
  );
}
