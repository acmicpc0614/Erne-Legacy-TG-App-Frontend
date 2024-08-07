import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../store";
import { getAllUsers } from "../store/reducers/wallet";
import RankingItem from "./RankingItem";
export default function RankingList() {
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
    <div className="md:w-full h-[65vh] mx-auto p-4">
      {/* max-h-[60vh] max-sm:max-h-[50vh] */}
      <div className=" overflow-auto">
        {usersa.map((data, idx) => (
          <div key={idx}>
            <RankingItem index={idx} data={data} />
          </div>
        ))}
      </div>
      {/* <hr className="my-3 border-[#363636] border-2" /> */}
      <div
        className={`flex my-3 px-3 py-2 items-center bg-[#363636] hover:bg-[#5f5f5f]  border-t-[#c4c4c4] border-t-[6px] border-transparent rounded-2xl gap-2 absolute bottom-24 w-[90%] justify-center`}
      >
        <div className="text-xl text-start w-[20%] font-sans text-[#8a8888] font-bold flex justify-center align-middle">
          {findUserRank("telegram")}
        </div>
        <div className="relative overflow-hidden h-10 w-[50%] flex items-center justify-start gap-2 ">
          <img
            src="/image/Bitmap3.png"
            alt="avatar"
            className="w-8 h-8 rounded-xl"
          />
          <p className="text-md text-start font-sans overflow-hidden text-[#8a8888] font-bold">
            telegram
          </p>
        </div>

        <p className="text-xl text-end pr-4 w-[30%] font-sans text-[#8a8888] font-bold">
          {findUserGDP("telegram")}
        </p>
      </div>
    </div>
  );
}
