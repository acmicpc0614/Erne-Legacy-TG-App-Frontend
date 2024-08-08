import RankingItem from "./RankingItem";
const RankingList: React.FC<RankingListProps> = ({ usersa }) => {
  return (
    <div className="md:w-full h-[65vh] mx-auto px-4">
      <div className=" overflow-auto">
        {usersa.map((data: any, idx: any) => (
          <div key={idx}>
            <RankingItem index={idx} data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RankingList;

interface RankingListProps {
  usersa: any; // The target date as a string
}
