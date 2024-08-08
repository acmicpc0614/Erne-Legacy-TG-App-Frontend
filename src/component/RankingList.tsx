import RankingItem from "./RankingItem";
const RankingList: React.FC<RankingListProps> = ({ usersa }) => {
  return (
    <div className="md:w-full h-[65vh] mx-auto px-4">
      {/* max-h-[60vh] max-sm:max-h-[50vh] */}
      <div className=" overflow-auto">
        {usersa.map((data: any, idx: any) => (
          <div key={idx}>
            <RankingItem index={idx} data={data} />
          </div>
        ))}
      </div>
      {/* <hr className="my-3 border-[#363636] border-2" /> */}
    </div>
  );
};
export default RankingList;

interface RankingListProps {
  usersa: any; // The target date as a string
}
