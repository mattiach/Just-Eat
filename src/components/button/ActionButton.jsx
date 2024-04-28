function ActionButton({
  type,
  value,
  onClick,
  className,
}) {

  return (
    <>
      <button
        onClick={() => onClick()}
        className={`px-3 ${className}`}
        type={type || "button"}
        name={value}
        aria-label={value}
      >
        {value}
      </button>
    </>
  );
}

export default ActionButton