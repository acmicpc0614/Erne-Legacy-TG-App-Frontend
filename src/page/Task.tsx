import axios from "../utils/api";
import { useSelector, dispatch } from "../store";
import { updateBalance } from "../store/reducers/wallet";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CountdownTimer from "../component/CountDownTimer";
import { CreateEffect } from "../component/MoneyUpdateEffect";
export default function Task() {
  const username_state = useSelector((state) => state.wallet.user?.username);
  const balance_state = useSelector((state) => state.wallet.user?.balance);
  const dailyEarnTime = useSelector(
    (state) => state.wallet.user?.dailyEarnTime
  );
  const [username, setUsername] = useState<string>(username_state);
  const [balance, setBalance] = useState<number>(balance_state);

  const bodyRef = useRef<HTMLDivElement>(null);

  const DAY = 20 * 1000;
  // const DAY = 86400 * 1000;
  const [targetDate, setTargetData] = useState<number>(dailyEarnTime + DAY);

  useEffect(() => {
    setUsername(username_state);
    setBalance(balance_state);
  }, [username_state, balance_state]);

  const handleGetDailyEarning = async () => {
    try {
      await axios.post(`/wallet/getDailyEarn/${username}`).then((res) => {
        if (res.status === 200) {
          dispatch(updateBalance(username, balance + 1000));
          // toast.success("You have received +1000 daily Earning successfully!");
          CreateEffect(bodyRef, 1000, "ADD", "70%", "180px");
          setTargetData(Date.now() + DAY);
        } else
          toast.info(
            "You earned already today's daily earnings! Please try tomorrow."
          );
      });
    } catch (error) {
      // console.log(error);/
      toast.warning("Unknown error occurred. Please try again later.");
    }
  };

  const handleJoinTelegramGroup = async () => {
    try {
      await axios.post(`/earnings/${username}`).then((res) => {
        // if (res.data.joinTelegram.status) {
        if (res.status === 200) {
          // if (!res.data.joinTelegram.earned) {
          //   dispatch(updateBalance(username, balance + 1000)).then(() => {
          //     axios.post(`/earnings/update/joinTelegram/${username}`, {
          //       status: true,
          //       earned: true,
          //     });
          toast.success("You have received +1000 coins successfully!");
          //   });
          // } else {
          //   toast.warning("You have already received bonus!");
          // }
        } else {
          toast.warning(
            "You didn't join Telegram Group yet! Please join again"
          );
        }
      });
    } catch (error) {
      toast.warning("Unknown error occurred. Please try again later.");
      // console.log(error);
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
      // console.log(error);
      toast.warning("Unknown error occurred. Please try again later.");
    }
  };

  const EarningItems: any[] = [
    {
      title: "Daily reward",
      description:
        "Send a message to our Telegram Group and earn +1000 coins every time you send a message!",
      icon: "image/cdollar.png",
      bonus: "+1000",
      action: handleGetDailyEarning,
      timer: true,
    },
    {
      title: "Join Telegram Group",
      description:
        "Join our Telegram Group and earn +1000 coins every time you send a message!",
      icon: "image/telegram.png",
      bonus: "+1000",
      action: handleJoinTelegramGroup,
      timer: false,
    },
    {
      title: "Subscribe Telegram Channel",
      description:
        "Subscribe to our Telegram Channel and earn +1000 coins every time you send a message!",
      icon: "image/telegram.png",
      bonus: "+1000",
      action: handleSubscribeTelegramChannel,
      timer: false,
    },
  ];

  return (
    <div className="Ranking max-w-full mx-auto text-white mt-8">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center ">
        <img src="image/dollar.png" alt="" className=" w-20 h-20 loader-gold" />
        <h2 className=" text-xl">Earn more coins</h2>
      </div>

      <div className="flex flex-col justify-center p-7 gap-4">
        {EarningItems.map((item, index) => (
          <div
            className="flex px-3 h-[75px] items-center bg-[#363636] hover:bg-[#5f5f5f]  border-l-[#ffb14a] border-l-[4px] border-transparent rounded-2xl "
            onClick={item.action}
            ref={bodyRef}
            key={index}
          >
            <img src={item.icon} alt="icon" className=" w-10 h-10" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                {item.title}
              </div>
              <div className="flex justify-start items-center ml-2 gap-1">
                <img src="image/dollar.png" alt="" className=" w-4 h-4" />
                <span className="text-sm text-amber-400">{item.bonus}</span>
              </div>
            </div>
            {item.timer && (
              <div className="flex absolute right-10 aspect-[1/1]">
                <CountdownTimer targetDate={targetDate} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
