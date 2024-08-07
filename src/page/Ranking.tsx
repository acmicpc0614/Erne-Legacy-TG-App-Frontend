import RankingList from "../component/RankingList";

export default function Ranking() {
  return (
    <div className="Ranking max-w-full mx-auto text-white mt-8 !h-full">
      <h1 className="text-3xl my-5 font-sans text-[#8a8888] font-bold  max-w-[500px] mx-auto text-start flex justify-center">
        Ranking
      </h1>
      <div className="flex px-3 py-1 text-white text-lg font-bold justify-start align-middle overflow-y-hidden">
        <div className="text-start w-[20%] flex justify-center">Rank</div>
        <div className="text-start w-[40%] flex justify-center">User</div>
        <div className="text-start w-[60%] flex justify-end pr-4">
          Total Score
        </div>
      </div>
      <RankingList />
    </div>
  );
}
