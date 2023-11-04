'use client';

const Button = ({ label, rounded, fullWidth, color, style, type, onClick }) => {
  return (
    <button
      className={
        (rounded ? 'rounded-full ' : '') +
        (style + ' ' || '') +
        (fullWidth ? 'w-full ' : 'w-fit ') +
        color +
        ' hover:scale-105 transition-all duration-300 ease-in-out active:scale-100'
      }
      onClick={onClick}
      type={type ? type : 'button'}
    >
      {label}
    </button>
  );
};
export default Button;
