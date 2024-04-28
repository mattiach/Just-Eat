const Button = ({ children, type, onClick, disabled, className }) => {

  // button default CSS style
  const buttonStyle = className ? className : "focus:outline-none bg-primary hover:bg-secondary text-white focus:ring-0 font-semibold text-xl rounded-lg py-3 px-4 mr-2 mb-2 w-52 md:w-60"

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyle}
    >
      {children}
    </button>
  );
};

export default Button