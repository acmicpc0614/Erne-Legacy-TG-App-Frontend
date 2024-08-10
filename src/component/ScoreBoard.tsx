function formatNumberWithCommas(number: number, locale = "en-US") {
  let tmp = "";
  let tmpNumber = number;
  if (tmpNumber >= 1000000000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000000000) / 1000;
    tmp = "P";
  } else if (tmpNumber >= 1000000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000000) / 1000;
    tmp = "T";
  } else if (tmpNumber >= 1000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000) / 1000;
    tmp = "G";
  } else if (tmpNumber >= 1000000) {
    tmpNumber = Math.floor(tmpNumber / 1000) / 1000;
    tmp = "M";
  } else if (tmpNumber >= 1000) {
    tmpNumber = tmpNumber / 1000;
    tmp = "K";
  }

  return new Intl.NumberFormat(locale).format(tmpNumber) + " " + tmp;
}

// Functional component
const ScoreBoard: React.FC<ScoreBoardProps> = ({ tapUnit, gdp, passive }) => {
  return (
    <>
      <div className="flex flex-col-3 gap-3 justify-center px-3 ">
        <div className="group grid grid-col-2 w-1/3  grid-col-1 rounded-lg bg-gradient-to-b from-[#E39431] to-pink-100 pt-[1px] px-[1px]">
          <div className="group w-full rounded-lg transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] bg-[#414141] py-2 px-[2px] h-[80px]  items-center justify-center flex flex-col gap-2">
            <h1 className="text-small text-[#eeeeee]">Earn per Tap</h1>
            <div className="flex flex-row items-center justify-center gap-1">
              <img src="/image/dollar.png" alt="dollar" className="w-4 h-4" />
              <h1 className="text-sm text-[#eeeeee]">
                +{tapUnit ? tapUnit : 1}
              </h1>
            </div>
          </div>
        </div>

        <div className="group grid grid-col-2 w-1/3  grid-col-1 rounded-lg bg-gradient-to-b from-[#E39431] to-pink-100 pt-[1px] px-[1px]">
          <div className="group w-full rounded-lg transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] bg-[#414141] py-2 px-[2px] h-[80px]  items-center justify-center flex flex-col gap-2">
            <h1 className="text-small text-[#eeeeee]">Passive Earning</h1>
            <div className="flex flex-row items-center justify-center gap-1">
              <img src="/image/dollar.png" alt="dollar" className="w-4 h-4" />
              <h1 className="text-sm text-[#eeeeee]">+{passive * 3600} / h</h1>
            </div>
          </div>
        </div>

        <div className="group grid grid-col-2 w-1/3  grid-col-1 rounded-lg bg-gradient-to-b from-[#E39431] to-pink-100 pt-[1px] px-[1px]">
          <div className="group w-full rounded-lg transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] bg-[#414141] py-2 px-[2px] h-[80px]  items-center justify-center flex flex-col gap-2">
            <h1 className="text-small text-[#eeeeee]">Total Earning</h1>
            <div className="flex flex-row items-center justify-center">
              <img src="/image/dollar.png" alt="dollar" className="w-4 h-4" />
              <h1 className="text-sm text-[#eeeeee]">
                &nbsp;{formatNumberWithCommas(gdp)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;

interface ScoreBoardProps {
  tapUnit: number;
  gdp: number; // Assuming total is a number
  passive: number; // Assuming PassItemCount[passItemLevel] is a number
}
