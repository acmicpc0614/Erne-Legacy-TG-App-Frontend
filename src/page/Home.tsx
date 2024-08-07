/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CountDate from "../component/CountDate";
import ProgressBar from "../component/ProgressBar";
import { dispatch, useSelector } from "../store";
import soundEffect from "../../public/effect/water.wav";
import axios from "../utils/api";
import {
  insertWallet,
  updateWallet,
  // updateEnergy,
  getWallet,
} from "../store/reducers/wallet";
import ScoreBoard from "../component/ScoreBoard";

function Home() {
  const PassItemCount = [0, 1, 2, 3, 4, 5];

  const audio = new Audio(soundEffect);
  const usernameState = useSelector((state) => state.wallet.user?.username);
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const energyState = useSelector((state) => state.wallet.user?.energy);
  const tapState = useSelector((state) => state.wallet.user?.tap);
  const limitState = useSelector((state) => state.wallet.user?.limit);
  const totalState = useSelector((state) => state.wallet.user?.totalPoint);
  const levelState = useSelector((state) => state.wallet.user?.level);
  const passItemLevel = useSelector(
    (state) => state.wallet.user?.passItemLevel
  );
  const lastTimeState = useSelector((state) => state.wallet.user?.lastTime);

  const [imgStatus, setImgStatus] = useState(false);
  const [tap, setTap] = useState<number>(tapState);
  const [username, setUsername] = useState<string>(usernameState);
  const [token, setToken] = useState<number>(tokenState);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(energyState);
  const [limit, setLimit] = useState<number>(limitState);
  const [total, setTotal] = useState<number>(totalState);
  // const [lastTime, setLastTime] = useState<number>(lastTimeState);

  // const [tapUnit, setTapUnit] = useState<number>(0);
  useEffect(() => {
    setUsername("telegram");
    axios.post(`/earnings/add`, { username: "telegram" });
    dispatch(insertWallet("telegram"));
    dispatch(getWallet("telegram")).then(() => {
      setTap(tapState);
      setToken(tokenState);
      setTotal(totalState);
      setRemainedEnergy(energyState);
    });
    // const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    // console.log("=========>webapp", webapp);
    // if (webapp) {

    //   setUsername(webapp["user"]["username"]);
    //   axios.post(`/earnings/add`, {username: webapp["user"]["username"]})
    //   dispatch(insertWallet(webapp["user"]["username"]));
    //   dispatch(getWallet(webapp["user"]["username"])).then(() => {
    //     setTap(tapState);
    //     setToken(tokenState);
    //     setRemainedEnergy(energyState);
    //   });
    // }
    if (passItemLevel > 0) {
      const miningInterval = setInterval(() => {
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

  useEffect(() => {
    setLimit(limitState);
  }, [limitState]);

  useEffect(() => {
    dispatch(insertWallet(username));
  }, [username]);

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }

  const bodyRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState<string>(`+${tap}`);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.random() * (event.clientX - rect.left);
    const y = Math.random() * (event.clientY - rect.top);

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    const newDiv = document.createElement("div");
    newDiv.textContent = `${score}`;
    newDiv.style.backgroundImage = "url('image/dollar.png')";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.backgroundPosition = "center";
    newDiv.style.fontSize = "30px";
    newDiv.style.paddingLeft = "30px";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.backgroundSize = "cover";
    newDiv.style.width = "40px";
    newDiv.style.height = "40px";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x + 50}px`;
    newDiv.style.top = `${y}px`;
    newDiv.style.color = score == "+1" ? "#58E1E2" : "red";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

    return () => clearTimeout(interval);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainedEnergy < limit && remainedEnergy > 0) {
        // dispatch(updateEnergy(username, remainedEnergy + 1));
      }
    }, 1000);
    return () => clearInterval(interval);
    // const interval = setTimeout(() => {
    //   if (remainedEnergy < limit && remainedEnergy > 0) {
    //     dispatch(updateEnergy(username, remainedEnergy + 1));
    //   }
    // });
  }, [username, remainedEnergy, limit]);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    audio.play();
    if (remainedEnergy > 0) {
      setScore(`+${tap}`);
      setToken(token + tap);
      setTotal(total + tap);
      dispatch(
        updateWallet(username, total + tap, token + tap, remainedEnergy - 1)
      );
      setRemainedEnergy(remainedEnergy - 1);
      handleClick(event);
    }
  };

  const handleMouseDown = () => {
    setImgStatus(true);
  };

  const handleMouseLeave = () => {
    setImgStatus(false);
  };

  return (
    <div className="mt-8">
      <ToastContainer />
      <ScoreBoard tapUnit={1} gdp={total} />
      {/* <CountDate date={1} />   */}
      <div className="relative mt-8 flex flex-col items-center w-full mb-9">
        <div className="flex flex-col justify-center items-center mb-7">
          {/* <div className="flex justify-center items-center">
            <img src="image/money-bag.png" alt="" className=" w-5 h-5" />
            <h3 className="text-xl font-bold text-[#fff243]">
              &nbsp;&nbsp;Mystery laughter
            </h3>
          </div> */}
          <div className="flex flex-row gap-3 items-center">
            <img src="/image/money-bag.png" alt="" className="w-10 h-10" />
            <h1 className="text-5xl text-white">
              {formatNumberWithCommas(token)}
            </h1>
          </div>
          {/* <div className="flex flex-row gap-10">
            <h5 className="text-xl text-white">
              GDP : {formatNumberWithCommas(total)}
            </h5>

            <h5 className="text-xl text-white">
              level : {formatNumberWithCommas(levelState)}
            </h5>
          </div> */}
        </div>
        <div>
          <div
            className={`relative bg-[url('/image/Bitmap3.png')] mb-7 rounded-full bg-cover z-50 w-[400px] h-[400px] max-sm:w-[280px] max-sm:h-[280px] ${
              remainedEnergy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            } ${imgStatus ? " border-[5px]" : "border-0"}`}
            ref={bodyRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onClick={handleTap}
          />
        </div>
        <div className="flex flex-row justify-between w-full px-8 max-sm:px-4 mt-4">
          <div className="flex justify-between w-full">
            <h3 className="flex justify-center items-center text-2xl mb-2 text-white flex-row">
              <span className="text-3xl ">
                <img
                  src="/image/icon/lightning.svg"
                  alt="lightning"
                  className="w-6 h-6 inline"
                />
              </span>
              <span className="text-xl text-white">{remainedEnergy}</span> /{" "}
              {limit}
            </h3>
            <div className="flex justify-center items-center">
              <Link to="/boost" className="flex">
                <img
                  src="/image/rocket.png"
                  alt="rocket"
                  className="w-8 h-8 inline"
                />
                <h3 className="text-xl text-white">Boost</h3>
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
