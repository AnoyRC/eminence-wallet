export default function SquareGradientButton({ Line1, Line2, onClick, Icon }) {
  return (
    <div
      className="h-[180px] rounded-[8px] flex justify-between p-5 hover:cursor-pointer"
      style={{
        background: 'linear-gradient(90deg, #4AFF93 0%, #26FFFF 100%)',
      }}
      onClick={onClick}
    >
      <div className="flex flex-col text-black font-bold text-[52px] leading-[65px]">
        <p>{Line1}</p>
        <p>{Line2}</p>
      </div>
      <Icon className="w-[60px] h-[60px] text-black mt-1.5" />
    </div>
  );
}
