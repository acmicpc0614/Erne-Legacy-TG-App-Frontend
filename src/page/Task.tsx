import axios from "../utils/api";
import { useSelector, dispatch } from "../store";
import { updateBalance } from "../store/reducers/wallet";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CountdownTimer from "../component/CountDownTimer";
export default function Task() {
  const username_state = useSelector((state) => state.wallet.user?.username);
  const balance_state = useSelector((state) => state.wallet.user?.balance);
  const [username, setUsername] = useState<string>(username_state);
  const [balance, setBalance] = useState<number>(balance_state);

  const DAY = 86400 * 1000;
  // const TESTMINUTE = 20 * 1000; // 10s
  // const targetDate = Date.now() - (Date.now() % TESTMINUTE) + TESTMINUTE;
  const [targetDate, setTargetData] = useState<number>(
    Date.now() - (Date.now() % DAY) + DAY
  );

  useEffect(() => {
    setUsername(username_state);
    setBalance(balance_state);
  }, [username_state, balance_state]);
  const handleJoinTelegramGroup = async () => {
    try {
      await axios.post(`/earnings/${username}`).then((res) => {
        if (res.data.joinTelegram.status) {
          if (!res.data.joinTelegram.earned) {
            dispatch(updateBalance(username, balance + 1000)).then(() => {
              axios.post(`/earnings/update/joinTelegram/${username}`, {
                status: true,
                earned: true,
              });
              toast.success("You have received +1000 coins successfully!");
            });
          } else {
            toast.warning("You have already received bonus!");
          }
        } else {
          toast.warning(
            "You didn't join Telegram Group yet! Please join again"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubscribeTelegramChannel = async () => {
    try {
      await axios.post(`/earnings/${username}`).then((res) => {
        if (res.data.subscribeTelegram.status) {
          if (!res.data.subscribeTelegram.earned) {
            dispatch(updateBalance(username, balance + 1000)).then(() => {
              axios.post(`/earnings/update/subscribeTelegram/${username}`, {
                status: true,
                earned: true,
              });
              toast.success("You have received +1000 coins successfully!");
            });
          } else {
            toast.warning("You have already received bonus!");
          }
        } else {
          toast.warning(
            "You didn't subscribe Telegram Channel yet! Please join again"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDailyEarning = async () => {
    // setUsername("telegram");
    try {
      await axios
        .post(`/wallet/getDailyEarn/${username ? username : "telegram"}`)
        .then((res) => {
          // await axios.post(`/wallet/getDailyEarn/telegram`).then((res) => {
          if (res.status === 200) {
            toast.success(
              "You have received +1000 daily Earning successfully!"
            );
            setTargetData(Date.now() - (Date.now() % DAY) + DAY);
          } else
            toast.info(
              "You earned already today's daily earnings! Please try tomorrow."
            );
        });
    } catch (error) {
      console.log(error);
      toast.warning("Unknown error occurred. Please try again later.");
    }
  };

  return (
    <div className="Ranking max-w-full mx-auto text-white mt-8">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <img src="image/dollar.png" alt="" className=" w-20 h-20" />
        <h2 className=" text-xl">Earn more coins</h2>
      </div>

      <div className="flex flex-col justify-center p-7 gap-4">
        <div
          className="flex px-3 h-[100px] items-center bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#4aff86] border-l-[6px] border-transparent rounded-2xl gap-2"
          onClick={handleGetDailyEarning}
        >
          <div className="flex justify-start items-center">
            <img src="image/cdollar.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                Daily reward
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="avatar" className=" w-5 h-5" />
                <span className=" text-amber-400">+1000</span>
              </div>
            </div>
            <div className="flex absolute right-10 aspect-[1/1]">
              <CountdownTimer targetDate={targetDate} />
            </div>
          </div>
        </div>

        <div
          className="flex px-3 h-[100px] items-center bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#4aff86] border-l-[6px] border-transparent rounded-2xl gap-2"
          onClick={handleJoinTelegramGroup}
        >
          <div className="flex justify-start items-center">
            <img src="image/telegram.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                Join Our TG Group
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                <span className=" text-amber-400">+1000</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex px-3 h-[100px] items-center bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#4aff86] border-l-[6px] border-transparent rounded-2xl gap-2"
          onClick={handleSubscribeTelegramChannel}
        >
          <div className="flex justify-start items-center">
            <img src="image/telegram.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                Subscribe Our TG Channel
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                <span className=" text-amber-400">+1000</span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex px-3 h-[100px] items-center bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#4aff86] border-l-[6px] border-transparent rounded-2xl gap-2">
          <div className="flex justify-start items-center">
            <img src="image/twitter.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                Follow our X account
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                <span className=" text-amber-400">+1000</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
