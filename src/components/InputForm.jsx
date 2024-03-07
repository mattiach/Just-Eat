const InputForm = ({
  field,
  form: { touched, errors },
  type,
  placeholder,
  className
}) => {
  return (
    <>
      <input
        {...field}
        type={type ? type : 'text'}
        placeholder={placeholder}
        className={`px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-primary outline-none custom-shadow-sm ${className}`}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="text-red-500 text-sm">{errors[field.name]}</div>
      )}
    </>
  );
};

export default InputForm;
