/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CountDate from "../component/CountDate";
import ProgressBar from "../component/ProgressBar";
import { dispatch, useSelector } from "../store";
import soundEffect from "../../public/effect/water.wav";
import {
  insertWallet,
  updateWallet,
  // updateEnergy,
  getWallet,
  // removeBonusCard,
  // updateEnergy,
} from "../store/reducers/wallet";
import ScoreBoard from "../component/ScoreBoard";
import axios from "axios";
import { CreateEffect } from "../component/MoneyUpdateEffect";

function Home() {
  const PassItemCount = [0, 1, 2, 3, 4, 5];
  // const PassItemLimitTime = [0, 10, 3600, 3600, 3600, 3600];

  const audio = new Audio(soundEffect);
  const usernameState = useSelector((state) => state.wallet.user?.username);
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const energyState = useSelector((state) => state.wallet.user?.energy);
  const tapState = useSelector((state) => state.wallet.user?.tap);
  const limitState = useSelector((state) => state.wallet.user?.limit);
  const totalState = useSelector((state) => state.wallet.user?.totalPoint);
  // const levelState = useSelector((state) => state.wallet.user?.level);
  const passItemLevelState = useSelector(
    (state) => state.wallet.user?.passItemLevel
  );
  const passItemStartTimeState = useSelector(
    (state) => state.wallet.user?.passItemStartTime
  );
  // const lastTimeState = useSelector((state) => state.wallet.user?.lastTime);

  const [imgStatus, setImgStatus] = useState(false);
  const [tap, setTap] = useState<number>(tapState);
  const [username, setUsername] = useState<string>(usernameState);
  const [token, setToken] = useState<number>(tokenState);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(energyState);
  const [limit, setLimit] = useState<number>(limitState);
  const [total, setTotal] = useState<number>(totalState);
  const [passItemStartTime, setpassItemStartTime] = useState<number>(
    passItemStartTimeState
  );
  const [passItemLevel, setpassItemLevel] =
    useState<number>(passItemLevelState);
  let miningInterval: any;

  useEffect(() => {
    // const TESTNAME = "test 2";
    // setUsername(TESTNAME);
    // dispatch(insertWallet(TESTNAME));
    // dispatch(getWallet(TESTNAME));

    // setTap(tapState);
    // setToken(tokenState);
    // setTotal(totalState);

    // setRemainedEnergy(energyState);
    // setpassItemStartTime(passItemStartTimeState);

    const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    console.log("=========>webapp", webapp);
    if (webapp) {
      setUsername(webapp["user"]["username"]);
      axios.post(`/earnings/add`, { username: webapp["user"]["username"] });
      dispatch(insertWallet(webapp["user"]["username"]));
      dispatch(getWallet(webapp["user"]["username"])).then(() => {
        setTap(tapState);
        setToken(tokenState);
        setRemainedEnergy(energyState);
      });
    }

    if (passItemLevelState) {
      miningInterval = setInterval(() => {
        // console.log("passive mining +", passItemLevel);
        setToken((prevToken) => {
          const tmp = prevToken + PassItemCount[passItemLevel];
          return tmp;
        });

        setTotal((prevTotal) => {
          const tmp = prevTotal + PassItemCount[passItemLevel];
          return tmp;
        });
      }, 1000); // Mine every second
      return () => {
        clearInterval(miningInterval);
      };
    }
  }, []);

  // this will not used
  if (total == -1) {
    setpassItemStartTime(1);
    console.log(passItemStartTime);
    setpassItemLevel(-1);
  }
  useEffect(() => {
    setLimit(limitState);
    console.log(imgStatus);
  }, [limitState]);

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }

  const bodyRef = useRef<HTMLDivElement>(null);
  const handleTapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.random() * (event.clientX - rect.left) + "px";
    const y = Math.random() * (event.clientY - rect.top) + "px";

    CreateEffect(bodyRef, tap, "ADD", x, y);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainedEnergy < limit && remainedEnergy > 0) {
        // energy generate per 1s
        // dispatch(updateEnergy(username, remainedEnergy + 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [username, remainedEnergy, limit]);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    // console.log("handleTap =>", username, total, token, remainedEnergy, tap);
    audio.play();
    if (remainedEnergy > 0) {
      setToken(token + tap);
      setTotal(total + tap);
      dispatch(
        updateWallet(username, total + tap, token + tap, remainedEnergy - 1)
      );
      setRemainedEnergy(remainedEnergy - 1);
      handleTapClick(event);
    }
  };
  const handleMouseDown = () => {
    setImgStatus(true);
  };

  const handleMouseLeave = () => {
    setImgStatus(false);
  };
  return (
    <div className="mt-8 ">
      <ToastContainer />
      <ScoreBoard
        tapUnit={1}
        gdp={total}
        passive={PassItemCount[passItemLevel]}
      />
      {/* <CountDate date={1} />   */}
      <div className="relative mt-8 flex flex-col items-center w-full mb-9">
        <div className="flex flex-row gap-3 items-center mb-2">
          <img src="/image/money-bag.png" alt="" className="w-10 h-10" />
          <div className="text-4xl font-bold text-[#eeeeee]">
            {formatNumberWithCommas(token)}
          </div>
        </div>

        <div
          className={`relative bg-[url('/image/Bitmap1.png')] mt-7 rounded-full bg-cover z-50 w-[260px] h-[260px] loader ${
            remainedEnergy > 0
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-50"
          } `}
          ref={bodyRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseLeave}
          onClick={handleTap}
        />
        <div className="flex flex-row justify-between w-full px-8 max-sm:px-4 mt-2 ">
          <div className="flex justify-between w-full">
            <div className="flex justify-center items-center text-2xl mb-2 text-white flex-row">
              <span className="text-3xl ">
                <img
                  src="/image/icon/lightning.svg"
                  alt="lightning"
                  className="w-6 h-6 inline"
                />
              </span>
              <span className="text-sm  font-bold">
                {remainedEnergy} / {limit}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <Link to="/boost" className="flex items-center gap-2">
                <img
                  src="/image/quest.png"
                  alt="rocket"
                  className="w-8 h-8 inline"
                />
                <div className="text-xl text-white">Boost</div>
              </Link>
            </div>
          </div>
        </div>
        <ProgressBar value={remainedEnergy / 10} />
      </div>
    </div>
  );
}

export default Home;
