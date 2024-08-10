/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "../store";
import { toast, ToastContainer } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "../utils/api";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { initUtils } from "@telegram-apps/sdk";

export default function QuestList() {
  const utils = initUtils();
  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, setUsername] = useState<string>(username_state);
  // const [isCopied, setIsCopied] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);
  const [textToCopy, setTextToCopy] = useState<string>("");
  useEffect(() => {
    setUsername(username_state);
    setTextToCopy(`https://t.me/Kamamuri_bot?start=${username_state}`);
  }, [username_state]);

  const handleCopyTwo = () => {
    const tmpURL = `https://t.me/Kamamuri_bot?start=${username_state}`;
    const tmpTEXT = "comeon...";
    let fullURL = `https://t.me/share/url?url={${tmpURL}}&text={${tmpTEXT}}`;
    console.log("fullURL =>", fullURL);
    // window.location.href = fullURL;
    utils.openTelegramLink(fullURL);
  };
  const handleCopy = async () => {
    // setIsCopied(true);
    toast.success("Copied to clipboard!");
  };
  useEffect(() => {
    if (username) {
      axios.post(`/friend/${username}`).then((res) => {
        setFriends(res.data);
      });
    }
  }, []);

  return (
    <div className="overflow-auto p-5">
      <ToastContainer />
      <div className="flex flex-col justify-between items-center">
        <h1 className=" text-white text-3xl">Invite friends!</h1>
        <p className=" text-white">You and your friend will receive bonuses</p>
      </div>
      <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
        <div className="flex items-center h-24 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#ffb14a] border-l-[4px] border-transparent rounded-2xl">
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
        <div className="flex items-center h-24 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#ffb14a] border-l-[4px] border-transparent rounded-2xl">
          <div className="flex justify-start items-center">
            <img src="image/bonus.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white font-bold ml-3">
                Invite a friend with Telegram premium
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                <span className=" text-amber-400">+ 3000</span>
                <span>&nbsp;&nbsp;&nbsp;for you and your friend</span>
              </div>
            </div>
          </div>
        </div>
      </CopyToClipboard>
      {/* friends list */}
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-white text-sm">List of your friends</h2>
        <div className="  w-full h-12 flex justify-center items-center">
          <div className="relative w-full mx-9">
            <ul className="absolute mt-1 w-full bg-[#363636] border border-[#575757] rounded-lg shadow-lg z-10 overflow-auto">
              {friends.map((it) => (
                <li
                  key={it.friend}
                  className="cursor-pointer select-none relative p-2 text-white hover:bg-[#575757] rounded-lg"
                >
                  {it.friend}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
