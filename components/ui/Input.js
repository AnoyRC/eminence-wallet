const Input = ({ type, placeholder, value, onChange, ref, width }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
      className="w-full rounded px-8 py-3 bg-primary-white/60 text-primary-black font-medium text-base"
      style={{
        width: width,
      }}
    />
  );
};

export default Input;
