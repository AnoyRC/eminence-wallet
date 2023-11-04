export default function GradientButton({ label, onClick, style }) {
  return (
    <div
      className={`rounded-full bg-transparent bg-gradient-to-r h-[45px] p-0.5 from-[#4AFF93] to-[#26FFFF] w-full ${
        style ? style : ''
      }`}
    >
      <button
        className="bg-[#1C1D22] rounded-full w-full h-full text-white text-[16px] font-bold"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
