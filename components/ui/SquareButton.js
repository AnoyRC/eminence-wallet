export default function SquareButton({ Line1, Line2, onClick, Icon }) {
  return (
    <div
      className="h-[180px] bg-black rounded-[8px] flex justify-between p-5 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col text-white font-bold text-[52px] leading-[65px]">
        <p>{Line1}</p>
        <p>{Line2}</p>
      </div>
      <Icon className="w-[60px] h-[60px] text-white mt-1.5" />
    </div>
  );
}
