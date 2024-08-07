function formatNumberWithCommas(number: number, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(number);
}

const ScoreBoard = (tapUnit: any, total: any) => {
  console.log(tapUnit);
  return (
    <>
      <div className="flex flex-col-3 gap-3 justify-center">
        <div className="grid grid-col-2 w-1/3  grid-col-1 px-[2px] rounded-xl bg-[#3f3f3f] h-[70px]">
          <div className="flex items-center justify-center text-[#ffd412]">
            Earn per Tan
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <img src="/image/dollar.png" alt="dollar" className="w-4 h-4" />
            <h1 className="text-xl ">+{tapUnit?.tapUnit}</h1>
          </div>
        </div>
        <div className="grid grid-col-2 w-1/3  grid-col-1 px-[2px] rounded-xl bg-[#3f3f3f] h-[70px]">
          <div className="flex items-center justify-center text-[#ffd412]">
            GDP
          </div>
          <div className="flex flex-row items-center justify-center">
            <img src="/image/dollar.png" alt="dollar" className="w-4 h-4" />
            <h1 className="text-xl">{formatNumberWithCommas(tapUnit?.gdp)}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
