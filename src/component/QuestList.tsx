/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "../store";
import { toast, ToastContainer } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "../utils/api";
import { FaSearch } from "react-icons/fa"; // Importing a search icon from react-icons
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
    // console.log("fullURL =>", fullURL);
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

  const InviteFriendsItems: any[] = [
    {
      id: 1,
      icon: "/image/bonus.png",
      label: "Invite a friend",
      bonus: "+ 1000",
      url: "https://t.me/Kamamuri_bot?start=your_username",
      onCopy: handleCopy,
    },
    {
      id: 2,
      icon: "/image/telegram.png",
      label: "Invite a friend with TG premium",
      bonus: "+ 1000",
      url: "https://t.me/Kamamuri_bot?start=your_username",
      onCopy: handleCopyTwo,
    },
  ];

  return (
    <div className="overflow-auto p-5 h-[90vh] ">
      <ToastContainer />
      <div className="flex flex-col justify-between items-center">
        <h1 className=" text-white text-3xl">Invite friends!</h1>
        <p className=" text-white">You and your friend will receive bonuses</p>
      </div>

      {InviteFriendsItems.map((item, idx) => (
        <CopyToClipboard text={textToCopy} onCopy={item.onCopy} key={idx}>
          <div className="flex items-center h-20 max-sm:h-20 justify-start px-3 py-2 my-4 bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#ffb14a] border-l-[4px] border-transparent rounded-2xl hover:cursor-pointer">
            <img src={item.icon} alt={item.label} className=" w-12 h-12" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                {item.label}
              </div>

              <div className="flex flex-row justify-start items-center ml-2 gap-1">
                <img src="image/dollar.png" alt="dollar" className=" w-4 h-4" />
                <span className="text-sm text-amber-400">{item.bonus}</span>
              </div>
            </div>
          </div>
        </CopyToClipboard>
      ))}
      {/* friends list */}
      <div className="flex flex-col items-start gap-2 ">
        <div className="flex flex-row justify-between w-full h-7">
          <div className="text-white text-sm">List of your friends</div>
          <div className="relative  w-[200px] border-b-2 border-b-[#505050]  rounded-lg ">
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
          {viewFriends.length ? (
            viewFriends.map((it) => (
              <div
                key={it.friend}
                className="cursor-pointer p-2 text-white hover:bg-[#303030]  border-b-[#505050] border-b-2 w-full"
              >
                {it.friend}
              </div>
            ))
          ) : (
            <div className="flex h-[180px] items-center">
              There is no friends.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
