/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "../store";
import { toast, ToastContainer } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "../utils/api";
import { FaSearch } from "react-icons/fa"; // Importing a search icon from react-icons
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { initUtils } from "@telegram-apps/sdk";

export default function QuestList() {
  const utils = initUtils();
  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, setUsername] = useState<string>(username_state);
  // const [isCopied, setIsCopied] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);
  const [viewFriends, setViewFriends] = useState<any[]>([]);

  const [textToCopy, setTextToCopy] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setUsername(username_state);
    setTextToCopy(`https://t.me/Kamamuri_bot?start=${username_state}`);
  }, [username_state]);

  const handleCopyTwo = () => {
    const tmpURL = `https://t.me/Kamamuri_bot?start=${username_state}`;
    const tmpTEXT =
      "OurApp: Your first crypto wealth. Join, share, and earn airdrops!";
    let fullURL = `https://t.me/share/url?url=${tmpURL}&text=${tmpTEXT}`;
    console.log("fullURL =>", fullURL);
    utils.openTelegramLink(fullURL);
  };
  const handleCopy = async () => {
    toast.success("Copied to clipboard!");
  };
  useEffect(() => {
    if (username) {
      axios.post(`/friend/${username}`).then((res) => {
        setFriends(res.data);
      });
    }
  }, []);

  useEffect(() => {
    setViewFriends(friends ? friends : []);
  }, [friends]);

  const handleSearch = (searchname: string) => {
    const lowerCaseSearchName = searchname.toLowerCase();
    setSearchInput(lowerCaseSearchName);
    setViewFriends(
      friends.filter((friend) =>
        friend.friend.toLowerCase().includes(lowerCaseSearchName)
      )
    );
  };

  return (
    <div className="overflow-auto p-5 h-[90vh]">
      <ToastContainer />
      <div className="flex flex-col justify-between items-center">
        <h1 className=" text-white text-3xl">Invite friends!</h1>
        <p className=" text-white">You and your friend will receive bonuses</p>
      </div>
      <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
        <div className="flex items-center h-20 max-sm:h-20 justify-between px-3 py-2 my-4 bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#ffb14a] border-l-[4px] border-transparent rounded-2xl hover:cursor-pointer">
          <div className="flex justify-start items-center">
            <img src="image/bonus.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                Invite a friend
              </div>
              <div className="flex flex-row">
                <div className="flex justify-start items-center ml-2">
                  <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                  <span className=" text-amber-400">+ 1000</span>
                  <span>&nbsp;&nbsp;&nbsp;for you and your friend</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CopyToClipboard>
      <CopyToClipboard text={textToCopy} onCopy={handleCopyTwo}>
        <div className="flex items-center h-20 max-sm:h-20 justify-between px-3 py-2 my-4 bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#ffb14a] border-l-[4px] border-transparent rounded-2xl hover:cursor-pointer">
          <div className="flex justify-start items-center">
            <img src="image/bonus.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white font-bold ml-3">
                Invite a friend with Telegram premium
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                <span className=" text-amber-400">+ 1000</span>
                <span>&nbsp;&nbsp;&nbsp;for you and your friend</span>
              </div>
            </div>
          </div>
        </div>
      </CopyToClipboard>
      {/* friends list */}
      <div className="flex flex-col items-start gap-2 ">
        <div className="flex flex-row justify-between w-full h-7">
          <div className="text-white text-sm">List of your friends</div>
          <div className="relative  w-[200px] border-b-2 border-b-gray-300  rounded-md ">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className=" text-center text-sm w-[120px] bg-transparent focus:outline-none right-0"
              placeholder="Search..."
              type="text"
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full just items-center h-[180px] overflow-y-auto">
          {viewFriends.map((it) => (
            <div
              key={it.friend}
              className="cursor-pointer p-2 text-white hover:bg-[#303030]  border-b-[#505050] border-b-2 w-full"
            >
              {it.friend}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
